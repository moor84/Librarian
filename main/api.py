from tastypie import fields, utils
from tastypie.resources import ModelResource
from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.exceptions import BadRequest

from main.models import Book, Contact, LentBook

class BookResource(ModelResource):
    class Meta:
        queryset = Book.objects.all()
        resource_name = 'books'
        allowed_methods = ['get', 'post', 'put', 'patch']
        filtering = {
            'text':     ('icontains'),
        }


class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = 'contacts'
        allowed_methods = ['get', 'post', 'put', 'patch']


class LentBookResource(ModelResource):
    book = fields.ForeignKey(BookResource, 'book')
    contact = fields.ForeignKey(ContactResource, 'contact')

    class Meta:
        queryset = LentBook.objects.all()
        resource_name = 'lentbooks'
        allowed_methods = ['get', 'post', 'put', 'patch']
        filtering = {
            'book':     ALL_WITH_RELATIONS,
            'debtor':   ALL_WITH_RELATIONS,
        }