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

App.LentBook = Backbone.Model.extend({
    urlRoot: App.urlRoot + '/lentbooks/',

    validation: {
        'book': {
            required: true
        },
        'contact': {
            required: true
        }
    }
});

App.LentBooks = Backbone.Collection.extend({
    urlRoot: App.urlRoot + '/lentbooks/',
    model: App.LentBook
});

App.TopBook = Backbone.Model.extend({});

App.TopBooks = Backbone.Collection.extend({
    urlRoot: App.urlRoot + '/topbooks/',
    model: App.TopBook
});

App.TopContact = Backbone.Model.extend({});

App.TopContacts = Backbone.Collection.extend({
    urlRoot: App.urlRoot + '/topcontacts/',
    model: App.TopContact
});
