App.Book = Backbone.Model.extend({
    urlRoot: App.urlRoot + '/books/',

    validation: {
        'title': {
            required: true
        }
    }
});

App.Books = Backbone.Collection.extend({
    urlRoot: App.urlRoot + '/books/',
    model: App.Book
});

App.Contact = Backbone.Model.extend({
    urlRoot: App.urlRoot + '/contacts/',

    validation: {
        'first_name': {
            required: true
        },
        'last_name': {
            required: true
        }
    }
});

App.Contacts = Backbone.Collection.extend({
    urlRoot: App.urlRoot + '/contacts/',
    model: App.Contact
});
