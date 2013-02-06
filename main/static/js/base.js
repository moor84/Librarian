window.App = {

};

App.formToJson = function (form) {
    var json = {};
    $.map(form.serializeArray(), function(n, i) {
        json[n['name']] = n['value'];
    });
    form.find('input[type=checkbox]:not(:checked)').map(function () {
        json[this.name] = false;
    });
    return json;
};

App.urlRoot = '/api/v1';

App.getUriFromId = function (resourceName, id) {
    return App.urlRoot + "/" + resourceName + "/" + id + "/";
};

App.getIdFromUri = function (resourceUri) {
    return _.last(_.compact(resourceUri.split('/')));
};

/**
 * [ description]
 *
 * @constructor
 */
var Alert = new function () {
    var alert = function (cls, content, header, doNotHide) {
        var elem = $('<div class="alert alert-' + cls + '">'
            + '<a class="close" data-dismiss="alert" href="#">×</a>'
            + (header ? '<h4 class="alert-heading">' + header + '</h4>' : '')
            + content
            + '</div>');
        elem.appendTo($('#alerts'));
        if (!doNotHide)
            setInterval(function () { elem.fadeOut() }, 7000);
    };

    this.error = function (content) { alert('error', content, 'Error') };
    this.sysError = function (content) { alert('error', content, 'Critical Error', true) };
    this.success = function (content) { alert('success', content, 'Success') };
    this.info = function (content) { alert('info', content, 'Warning') };
};

/**
 * Error handler.
 * TODO: implement error handling.
 *
 * @constructor
 */
var ErrorHandler = new function () {

    /**
     * [handleAjax description]
     *
     * @param  {[type]} e         [description]
     * @param  {[type]} jqxhr     [description]
     * @param  {[type]} settings  [description]
     * @param  {[type]} exception [description]
     */
    this.handleAjax = function (e, jqxhr, settings, exception) {
        Alert.sysError("Ajax error (" + settings.url + "): " + exception);
    }
};

/**
 * Simple loader.
 *
 * @constructor
 */
var Loader = new function () {
    var back = undefined;
    var loader = undefined;

    /**
     * Initialize.
     */
    this.init = function () {
        $('<div>', {'id': 'loaderBack'}).appendTo($('body'));
        $('<div>', {'id': 'loader'}).html('Loading...').appendTo($('body'));
        back = $('#loaderBack');
        loader = $('#loader');

        $(document).on("ajaxSend", function() {
            Loader.loading();
        }).on("ajaxComplete", function() {
            Loader.reset();
        });
    };

    /**
     * Set 'loading' state.
     */
    this.loading = function ()
    {
        back.hide();
        loader.hide();

        var loading = function () {
            back.css('height', $(window).height()).css('position', 'fixed');
            back.css('filter', 'alpha(opacity=70)');
            back.show();
            loader.css('top', $(window).height() / 2 - 100)
                .css('left', $(window).width() / 2 - 100);
            loader.show();
        };

        loading();
    };

    /**
     * Hide loader.
     */
    this.reset = function ()
    {
        back.hide();
        loader.hide();
    };
};

/**
 * Template rendering.
 *
 * @constructor
 */
var Tpl = new function () {

    var inited = false;

    var init = function () {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g,
            evaluate: /\{\%(.+?)\%\}/g
        };
        inited = true;
    };

    /**
     * Returns template contents.
     *
     * @param  {String} name Name of template.
     *
     * @return {String}
     */
    this.getTemplate = function (name) {
        if (!inited) init();
        return $('#' + name + 'Tpl').html();
    };

    this.val = function (value, escape) {
        try {
            if (_.isUndefined(escape)) escape = true;
            if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
                return '';
            } else {
                if (escape) {
                    return _.escape(value);
                } else {
                    return value;
                }
            }
        } catch (err) {
            return '';
        }
    };

    this.uri = function (resourceName, id) {
        return App.getUriFromId(resourceName, id);
    };

    /**
     * Render template.
     *
     * @param  {String} templateName Name of template.
     * @param  {Object} context  Context.
     *
     * @return {String}          Rendering result.
     */
    this.render = function (templateName, context) {
        if (!inited) init();
        var template = this.getTemplate(templateName);
        if (context && context.toJSON) {
            context = context.toJSON();
        }
        if (window.App ) {
            context.App = App;
        }
        var compiled = _.template(template);
        return compiled.call(this, context);
    };
};

/**
 * Base view for all app views.
 */
var BaseView = Backbone.View.extend({
    tagName:  "div",
    templateName: '',
    template: undefined,

    getTemplate: function () {
        if (!this.template) {
            this.template = Tpl.getTemplate(this.templateName);
        }
        return this.template;
    },

    beforeRender: function () {

    },

    afterRender: function () {

    },

    render: function () {
        this.beforeRender();
        this.$el.html(Tpl.render(this.getTemplate(), { view: this }));
        this.afterRender();
        return this;
    }
});

/**
 * Generalized form (add/edit) view.
 *
 * @constructor
 */
var FormView = BaseView.extend({
    model: undefined,
    savedMessage: 'Item has been saved.',

    events: {
        "click .save:first": function (e) { e.preventDefault(); this.saveModel(e.target); return false; },
        "click .cancel:first": function (e) { e.preventDefault(); this.cancel(e.target); return false; }
    },

    formToJson: function () {
        return App.formToJson(this.$el.find('form'));
    },

    saveModel: function (target, additionalFields) {
        var button = $(target);
        button.button('loading');
        var data = this.formToJson();
        if (additionalFields) {
            data = _.extend(data, additionalFields);
        }
        var self = this;
        this.model.save(data,
            {
                success: function () {
                    button.button('reset');
                    Alert.success(self.savedMessage);
                    self.save();
                },
                error: function (model, error) {
                    if (error.responseText)
                        Alert.sysError(error.responseText);
                    else if (_.isArray(error))
                        Alert.error(error.join('<br>'));
                    else
                        Alert.error(error);
                    button.button('reset');
                },
                wait: true
            }
        );
    },

    save: function () {

    },

    cancel: function (target) {

    },

    render: function () {
        Backbone.Validation.bind(this);
        this.beforeRender();
        this.$el.html(Tpl.render(this.getTemplate(), { view: this, model: this.model.toJSON() }));
        this.afterRender();
        return this;
    }
});

/**
 * List view.
 *
 * @class
 */
var ListView = BaseView.extend({
    collection: undefined,
    itemView: undefined,

    initialize: function() {
        this.collection.on('reset', function () { this.render() }, this);
    },

    render: function() {
        this.beforeRender();
        this.$el.html(Tpl.render(this.getTemplate(), { view: this, items: this.collection }));
        this.collection.each(function (item) {
            var view = new this.itemView({ model: item });
            this.$el.find('tbody').append(view.render().el);
        }, this);
        this.afterRender();
        return this;
    }
});

