from django.db import models

class Book(models.Model):
    '''Book model'''
    author = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default='')
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Contact(models.Model):
    '''Contact model'''
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def full_name(self):
        return ' '.join(name.title() for name in [self.first_name, self.last_name])


class LentBook(models.Model):
    '''Lent Book model'''
    book = models.ForeignKey(Book)
    contact = models.ForeignKey(Contact)
    created = models.DateTimeField(auto_now_add=True)
    return_by = models.DateTimeField(null=True, blank=True)
