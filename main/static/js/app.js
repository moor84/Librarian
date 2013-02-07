

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

    App.booksView = new App.BooksListView({ el: $('#booksView'), collection: App.books });
    App.contactsView = new App.ContactsListView({ el: $('#contactsView'), collection: App.contacts });

    App.books.reset(App.booksData);
    App.contacts.reset(App.contactsData);
});