from tastypie import fields, utils
from tastypie.resources import ModelResource
from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.exceptions import BadRequest
from tastypie.authorization import Authorization

from main.models import Book, Contact, LentBook

class BookResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Book.objects.all()
        resource_name = 'books'
        allowed_methods = ['get', 'post', 'put', 'patch']
        filtering = {
            'text':     ('icontains'),
        }


class ContactResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Contact.objects.all()
        resource_name = 'contacts'
        allowed_methods = ['get', 'post', 'put', 'patch']


class LentBookResource(ModelResource):
    book = fields.ForeignKey(BookResource, 'book')
    contact = fields.ForeignKey(ContactResource, 'contact')

    class Meta:
        authorization = Authorization()
        queryset = LentBook.objects.all()
        resource_name = 'lentbooks'
        allowed_methods = ['get', 'post', 'put', 'patch']
        filtering = {
            'book':     ALL_WITH_RELATIONS,
            'debtor':   ALL_WITH_RELATIONS,
        }