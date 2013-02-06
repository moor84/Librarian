

$(function () {
    $('#navBar li a').click(function (e) {
        e.preventDefault();
        $('.app-tab').hide();
        $('#' + $(this).data('tab-id')).show();
        $('#navBar li').removeClass('active');
        $(this).parent().addClass('active');
    })
});