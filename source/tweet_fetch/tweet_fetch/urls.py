from django.conf.urls import patterns, include, url
from django.contrib import admin
from fetch import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tweet_fetch.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/$', views.getTweets, name="home"),
    url(r'^home1/$', views.gethashes, name="home1"),
    url(r'^model/$', views.getTweets, name="home"),
    url(r'^tweets/$', views.tweets, name="tweets"),
    url(r'^fetch/$', views.fetch, name="fetch"),
    url(r'^final/$', views.final, name="final"),
)
