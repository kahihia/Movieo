from django.shortcuts import render_to_response
from TwitterAPI import TwitterAPI
from forms import *
from django.template import RequestContext
from django.core.context_processors import csrf

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

<<<<<<< HEAD

=======
>>>>>>> f5a23deb362e02914f3bda03960141cee6401a05
def testfunc(request):
    var=request.GET.getlist('tweet')
    context={'a':var}
    return render_to_response('test.html',context)

alltweets=[]

<<<<<<< HEAD
def printtweets(request):
    final=[]
    for i in range(len(alltweets)):
        final.append(alltweets[i])
    context={'alltweets':final}
    for i in range(len(alltweets)):
        alltweets.pop()
    return render_to_response('hello.html',context)


=======
>>>>>>> f5a23deb362e02914f3bda03960141cee6401a05
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
<<<<<<< HEAD
    req = keys.request('search/tweets', {'q': var, 'count': 10, 'lang': 'en'})
=======
    req = keys.request('search/tweets', {'q': var, 'count': 10, 'lang': 'en', 'until':'2015-08-20'})
>>>>>>> f5a23deb362e02914f3bda03960141cee6401a05
    list = []
    #z = []
    for j in req:
        list.append(j)
        # print j
        print j[u'text']
        alltweets.append(j[u'text'])
        #z = []
    context.update({'list': list})
    return render_to_response('index.html', context)


def tweets(request):
    # username = request.POST['username']
    return render_to_response('test.html', {})


def fetch(request):
    username = request.GET['username']
    return render_to_response('foo.html', username)


def final(request):
    form = FinalForm()
    request_context = RequestContext(request)
    if request.method == 'POST':
        form = FinalForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            hashtag = cd.get('hashtag')
            f = cd.get('fromdate')
            t = cd.get('todate')
            gethashes(request,hashtag)
    request_context = {'form': form}
    request_context.update(csrf(request))
    return render_to_response('final.html', request_context)
