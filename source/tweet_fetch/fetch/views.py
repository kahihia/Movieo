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
            print (hashtag, f, t)
    request_context = {'form': form}
    request_context.update(csrf(request))
    return render_to_response('final.html', request_context)
