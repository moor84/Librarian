from django import template
from django.template import TemplateSyntaxError
from django.template.loaders.filesystem import Loader
from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils import simplejson

register = template.Library()

@register.filter('to_json')
def to_json(object):
    if isinstance(object, QuerySet):
        return serialize('json', object)
    return simplejson.dumps(object)

@register.tag("js_template")
def js_template(parser, token):
    """
    Include js template
    """
    bits = token.split_contents()
    if len(bits) != 3:
        raise TemplateSyntaxError, "%r tag takes two arguments: the name of the template to be included, the id of template" % bits[0]

    template_name = bits[1]
    if template_name[0] in ('"', "'") and template_name[-1] == template_name[0]:
        template_name = template_name[1:-1]

    template_id = bits[2]
    if template_id[0] in ('"', "'") and template_id[-1] == template_id[0]:
        template_id = template_id[1:-1]

    loader = Loader()
    source, path = loader.load_template_source(template_name)

    begin = "<script id=\"%sTpl\" type=\"text/template\">\n" % template_id
    end = "\n</script>"

    return template.TextNode(begin + source + end)
