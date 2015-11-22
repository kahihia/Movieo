from django.shortcuts import render_to_response
from TwitterAPI import TwitterAPI
from forms import *
from django.template import RequestContext
from django.core.context_processors import csrf
import MySQLdb
import requests
import json

# Create your views here.
def getTweets(request):
    tweets = []
    keys = TwitterAPI('CfhP1QIjLmTkvwQ1pPXOqIWbU', 'sEldJOF2YsCBNELrZyKKZOVai9XTSW5eCKGPSRhGXXoD1x7n9Y',
                      '353421720-51hwAbUX52YvkRz22wkmDQyYxgeZbDlac6DxGJkB',
                      'BGIXratzyuqeCpdtlB9VIWSdXfc3CoQvwX0AXCCpVZDGK')
    req = keys.request('search/tweets', {'q': 'mission'})
    print req
    context = {'tweets': req}
    return render_to_response('test.html', context)


tweetarray=[]

def testfunc(request):
    var=request.GET.getlist('tweet')
    context={'a':var}
    return render_to_response('test.html',context)

alltweets=[]



def printtweets(request):
    final=[]
    finale=[]
    for i in range(len(alltweets)):
        final.append(alltweets[i])
    context={'alltweets':final}
    for i in range(len(alltweets)):
         alltweets.pop()
    send=json.dumps(tweetarray)
    print tweetarray
    return render_to_response('hello.html',context)


def gethashes(request, hashtag):
    lis = []
    var = ''
    context = {}
    count = hashtag.count('#')
    x = hashtag
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
            tweetdict.update({'text':j[u'text']})
            tweetdict.update({'name':j[u'user'][u'name']})
            tweetdict.update({'profile_image_url':j[u'user'][u'profile_image_url_https']})
            tweetdict.update({'created_at':j[u'created_at']})
        alltweets.append(j[u'text'])
        tweetarray.append(tweetdict)
    print "Tweet array %s" %tweetarray
    context.update({'list': list})
    return render_to_response('index.html', context)

def tweets(request):
    # username = request.POST['username']
    return render_to_response('test.html', {})


def fetch(request):
    username = request.GET['username']
    return render_to_response('foo.html', username)


def final(request):
    conn=MySQLdb.connect('localhost','root','12345','tweet_db')
    with conn:
        cur=conn.cursor()
        cur.execute("select name from movies;")
        x=cur.fetchall()
    form = FinalForm()
    request_context = RequestContext(request)
    if request.method == 'POST':
        form = FinalForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            hashtag = cd.get('hashtag')
            gethashes(request,hashtag)
    request_context = {'form': form,'a':x}
    request_context.update(csrf(request))
    return render_to_response('final.html', request_context)
