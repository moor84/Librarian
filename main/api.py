from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.constants import ALL_WITH_RELATIONS
from tastypie.authorization import Authorization

from main.models import Book, Contact, LentBook

class BookResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Book.objects.order_by('title').all()
        resource_name = 'books'
        allowed_methods = ['get', 'post', 'put', 'patch']
        filtering = {
            'text':     ('icontains'),
        }


class ContactResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Contact.objects.order_by('first_name', 'last_name').all()
        resource_name = 'contacts'
        allowed_methods = ['get', 'post', 'put', 'patch']


class LentBookResource(ModelResource):
    book = fields.ForeignKey(BookResource, 'book')
    contact = fields.ForeignKey(ContactResource, 'contact')

    class Meta:
        authorization = Authorization()
        queryset = LentBook.objects.get_all()
        resource_name = 'lentbooks'
        allowed_methods = ['get', 'post', 'put', 'patch', 'delete']
        filtering = {
            'book':     ALL_WITH_RELATIONS,
            'debtor':   ALL_WITH_RELATIONS,
        }

    def dehydrate_book(self, bundle):
        book = bundle.obj.book
        bundle.data['book_title'] = '%s by %s' % (book.title, book.author)
        return bundle.data['book']

    def dehydrate_contact(self, bundle):
        contact = bundle.obj.contact
        bundle.data['contact_title'] = contact.full_name
        return bundle.data['contact']


class TopBookResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Book.objects.get_top()
        resource_name = 'topbooks'
        allowed_methods = ['get']


class TopContactResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Contact.objects.get_top()
        resource_name = 'topcontacts'
        allowed_methods = ['get']