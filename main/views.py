from django.contrib.sites.models import Site

from annoying.decorators import render_to, ajax_request

from main.models import Book, Contact

#def _get_site():
#    return Site.objects.get_current()

@render_to('home.html')
def home(request):
    return {
        'site': Site.objects.get_current(),
        'books': Book.objects.order_by('title').all(),
        'contacts': Contact.objects.order_by('title').all(),
        'nav_point': 'home',
    }

@ajax_request
def stats(request):
    return {
        'top_books': [],
        'top_contacts': [],
    }

#@render_to('books.html')
#def books(request):
#    return { 'site': _get_site(), 'nav_point': 'books', }
#
#@render_to('contacts.html')
#def contacts(request):
#    return { 'site': _get_site(), 'nav_point': 'contacts', }
#
#@render_to('about.html')
#def about(request):
#    return { 'site': _get_site(), 'nav_point': 'about', }
