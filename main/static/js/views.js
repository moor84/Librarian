
App.BookView = ItemView.extend({
    templateName: 'book',

    events: {
        "click a.edit": function (e) { e.preventDefault(); this.edit(); }
    },

    edit: function () {
        var id = this.model.id;
        console.log(id);
        console.log(App.books.get(id));
        var view = new App.BookFormView({ model: App.books.get(id) });
        var modal = new Backbone.BootstrapModal({ content: view }).open();
    }
});

App.BookFormView = FormView.extend({
    templateName: 'bookForm',
    model: App.Book,

    save: function () {
        App.books.fetch();
    }
});

App.BooksListView = ListView.extend({
    templateName: 'booksView',
    itemView: App.BookView,

    events: {
        "click #addBookButton": function (e) { e.preventDefault(); this.add(); }
    },

    add: function () {
        var view = new App.BookFormView({ model: new App.Book() });
        var modal = new Backbone.BootstrapModal({ content: view }).open();
    }
});

App.ContactView = ItemView.extend({
    templateName: 'contact',

    events: {
        "click a.edit": function (e) { e.preventDefault(); this.edit(); }
    },

    edit: function () {
        var id = this.model.id;
        var view = new App.ContactFormView({ model: App.contacts.get(id) });
        var modal = new Backbone.BootstrapModal({ content: view }).open();
    }
});

App.ContactFormView = FormView.extend({
    templateName: 'contactForm',
    model: App.Contact,

    save: function () {
        App.contacts.fetch();
    }
});

App.ContactsListView = ListView.extend({
    templateName: 'contactsView',
    itemView: App.ContactView,

    events: {
        "click #addContactButton": function (e) { e.preventDefault(); this.add(); }
    },

    add: function () {
        var view = new App.ContactFormView({ model: new App.Contact() });
        var modal = new Backbone.BootstrapModal({ content: view }).open();
    }
});
