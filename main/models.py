from django.db import models

TOP_LIMIT = 5

class BookManager(models.Manager):
    '''Book model manager'''
    def get_top(self):
        return self.order_by('id').annotate(score=models.Count('book_loans')) \
            .filter(score__gt = 0) \
            .order_by('-score')[:TOP_LIMIT]


class Book(models.Model):
    '''Book model'''
    objects = BookManager()

    author = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default='')
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class ContactManager(models.Manager):
    '''Contact model manager'''
    def get_top(self):
        return self.order_by('id').annotate(score=models.Count('contact_loans'))\
            .filter(score__gt = 0) \
            .order_by('-score')[:TOP_LIMIT]


class Contact(models.Model):
    '''Contact model'''
    objects = ContactManager()

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def full_name(self):
        return ' '.join(name.title() for name in [self.first_name, self.last_name])


class LentBookManager(models.Manager):
    '''Lent Book model manager'''
    def get_all(self):
        return self.order_by('id').select_related().all()


class LentBook(models.Model):
    '''Lent Book model'''
    objects = LentBookManager()

    book = models.ForeignKey(Book, related_name='book_loans')
    contact = models.ForeignKey(Contact, related_name='contact_loans')

    created = models.DateTimeField(auto_now_add=True)
    return_by = models.DateTimeField(null=True, blank=True)
