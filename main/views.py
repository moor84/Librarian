from django.contrib.sites.models import Site

from annoying.decorators import render_to, ajax_request

from main.models import Book, Contact

@render_to('home.html')
def home(request):
    return {
        'site': Site.objects.get_current(),
        'books': [{ 'title': b.title, 'author': b.author, 'description': b.description, 'resource_uri': '/api/v1/books/%s/' % b.id }
                  for b in Book.objects.order_by('title').all()],
        'contacts': [{ 'first_name': c.first_name, 'last_name': c.last_name, 'resource_uri': '/api/v1/contacts/%s/' % c.id }
                  for c in Contact.objects.order_by('first_name', 'last_name').all()],
    }

@ajax_request
def stats(request):
    return {
        'top_books': [],
        'top_contacts': [],
    }
