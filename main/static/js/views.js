
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
    itemView: App.ContactView,

    events: {
        "click #addContactButton": function (e) { e.preventDefault(); this.add(); }
    },

    add: function () {
        var view = new App.ContactFormView({ model: new App.Contact() });
        var modal = new Backbone.BootstrapModal({ content: view }).open();
    }
});

App.LentBookView = ItemView.extend({
    templateName: 'lentbook',

    events: {
        "click a.remove": function (e) { e.preventDefault(); this.destroyItem(); }
    },

    destroyItem: function () {
        var id = this.model.id;
        var model = App.lentbooks.get(id);
        model.destroy();

        App.topbooks.fetch();
        App.topcontacts.fetch();
    }
});

App.LentBookFormView = FormView.extend({
    templateName: 'lentbookForm',
    model: App.LentBook,

    save: function () {
        App.lentbooks.fetch();
        App.topbooks.fetch();
        App.topcontacts.fetch();
    },

    afterRender: function () {
        this.$el.find('input[name=return_by]').datepicker({ format: 'yyyy-mm-dd' }).on('changeDate', function(e) {
            $(this).datepicker('hide');
        });
    }
});

App.LentBooksListView = ListView.extend({
    itemView: App.LentBookView,

    events: {
        "click #addLentBookButton": function (e) { e.preventDefault(); this.add(); }
    },

    add: function () {
        var view = new App.LentBookFormView({ model: new App.LentBook() });
        var modal = new Backbone.BootstrapModal({ content: view }).open();
    }
});

App.TopBookView = ItemView.extend({
    templateName: 'topBook'
});

App.TopBooksListView = ListView.extend({
    itemView: App.TopBookView
});

App.TopContactView = ItemView.extend({
    templateName: 'topContact'
});

App.TopContactsListView = ListView.extend({
    itemView: App.TopContactView
});
