

$(function () {
    $('#navBar li a').click(function (e) {
        e.preventDefault();
        $('.app-tab').hide();
        $('#' + $(this).data('tab-id')).show();
        $('#navBar li').removeClass('active');
        $(this).parent().addClass('active');
    });

    // Init simple loader.
    Loader.init();

    // Set up error handler.
    $(document).ajaxError(function(e, jqxhr, settings, exception) {
        Alert.sysError("Ajax error (" + settings.url + "): " + exception);
    });

    App.books = new App.Books();
    App.contacts = new App.Contacts();
    App.lentbooks = new App.LentBooks();
    App.topbooks = new App.TopBooks();
    App.topcontacts = new App.TopContacts();

    App.booksView = new App.BooksListView({ el: $('#booksView'), collection: App.books });
    App.contactsView = new App.ContactsListView({ el: $('#contactsView'), collection: App.contacts });
    App.lentbooksView = new App.LentBooksListView({ el: $('#lentbooksView'), collection: App.lentbooks });
    App.topbooksView = new App.TopBooksListView({ el: $('#topbooksView'), collection: App.topbooks });
    App.topcontactsView = new App.TopContactsListView({ el: $('#topcontactsView'), collection: App.topcontacts });

    App.books.reset(App.booksData);
    App.contacts.reset(App.contactsData);

    App.lentbooks.fetch();
    App.topbooks.fetch();
    App.topcontacts.fetch();
});