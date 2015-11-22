from TwitterAPI import TwitterAPI
import requests
import json




#def gethashes("""request,"""hashtag):
def gethashes(hashtag):
    tweetarray=[]
    lis = []
    var = ''
    context = {}
    count = hashtag.count('#')
    x = hashtag
    x = x.replace(' ','')
    temp = x.split(',')
    for i in range(count):
        lis.append(temp[i])
    keys = TwitterAPI('CfhP1QIjLmTkvwQ1pPXOqIWbU', 'sEldJOF2YsCBNELrZyKKZOVai9XTSW5eCKGPSRhGXXoD1x7n9Y',
                      '353421720-51hwAbUX52YvkRz22wkmDQyYxgeZbDlac6DxGJkB',
                      'BGIXratzyuqeCpdtlB9VIWSdXfc3CoQvwX0AXCCpVZDGK')
    if count == 1:
        var = lis[0]
    else:
        for i in range(count):
            var += str(lis[i]) + " OR "
    req = keys.request('search/tweets', {'q': var, 'count': 50, 'lang': 'en','result_type':'popular'})
    list = []
    for j in req:
        tweetdict={}
        list.append(j)
        if j[u'user'][u'verified']==True:
            tweetdict.update({'text':j[u'text'].encode('utf-8').decode('utf-8')})
            tweetdict.update({'name':j[u'user'][u'name']})
            tweetdict.update({'profile_image_url':j[u'user'][u'profile_image_url_https']})
            tweetdict.update({'created_at':j[u'created_at']})
        tweetarray.append(tweetdict)
    #print "Tweet array %s" %tweetarray
   # context.update({'list': list})
    return tweetarray
