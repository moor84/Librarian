from django.conf.urls import patterns, include, url

from tastypie.api import Api

from main.api import BookResource, LentBookResource, ContactResource

api = Api()
api.register(BookResource())
api.register(LentBookResource())
api.register(ContactResource())

urlpatterns = patterns('',
    url(r'^$', 'main.views.home', name='home'),
    url('', include('main.urls')),

    (r'^api/', include(api.urls)),
)
