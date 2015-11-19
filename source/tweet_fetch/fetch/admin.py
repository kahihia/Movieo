from django.contrib import admin
from django.db import models
# Register your models here.

from .models import takeHashTags
# from .views import final ,gethashes
admin.site.register(takeHashTags)




# admin.site.register(final)


# def gethashes(request, hashtag):
#     lis = []
#     context = {}
#     conn = MySQLdb.connect('localhost', 'root', '12345', 'tweet_db')
#     x = hashtag
#     lis.append(x.split(',')[0])
#     lis.append(x.split(',')[1])
#     keys = TwitterAPI('CfhP1QIjLmTkvwQ1pPXOqIWbU', 'sEldJOF2YsCBNELrZyKKZOVai9XTSW5eCKGPSRhGXXoD1x7n9Y',
#                       '353421720-51hwAbUX52YvkRz22wkmDQyYxgeZbDlac6DxGJkB',
#                       'BGIXratzyuqeCpdtlB9VIWSdXfc3CoQvwX0AXCCpVZDGK')
#     req = keys.request('search/tweets', {'q': lis[0] + " OR " + lis[1], 'count': 6})
#     list = []
#     z = []
#     for j in req:
#         list.append(j)
#     for k in range(len(list)):
#         t = str(list[k]).split(':')
#         for i in range(len(t)):
#             if str(t[i]).find("u'description'") != -1:
#                 z.append(t[i + 1])
#         print z[1].strip('u\'friends_count')
#         z = []
#     context.update({'list': list})
#     return render_to_response('index.html', context)
#
#
# def final(request):
#     form = FinalForm()
#     request_context = RequestContext(request)
#     if request.method == 'POST':
#         form = FinalForm(request.POST)
#         if form.is_valid():
#             cd = form.cleaned_data
#             hashtag = cd.get('hashtag')
#             f = cd.get('fromdate')
#             t = cd.get('todate')
#             gethashes(request,hashtag)
#             print (hashtag, f, t)
#     request_context = {'form': form}
#     request_context.update(csrf(request))
#     return render_to_response('final.html', request_context)
# class MytweetsAdmin(admin.ModelAdmin):
#     actions = [final]
#
# #
# admin.site.register(MytweetsAdmin)
# admin.site.register(gethashes)
#
