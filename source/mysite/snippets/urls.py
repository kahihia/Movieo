from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [

    url(r'^actors/(?P<pk>[0-9]+)$',views.actor_list),
    url(r'^actors/recent-movies/(?P<actor_id>[0-9]+)$',views.recentmovies),
    url(r'^actors/photos/(?P<actor_id>[0-9]+)$',views.actorphotos),
    url(r'^actors/videos/(?P<actor_id>[0-9]+)$',views.actorvideos),
    url(r'^actors/all-movies/(?P<actor_id>[0-9]+)$',views.allmovies),
    url(r'^actors/quotes/(?P<actor_id>[0-9]+)$',views.actorquotes),



    url(r'^search-movies/*',views.movie_search),
    url(r'^search-actors/*',views.actor_search),
    url(r'^movies/top-box$',views.top_box),
    url(r'^movies/cast/(?P<pk>[0-9]+)$',views.cast_details),
    url(r'^movies/photos/(?P<pk>[0-9]+)$',views.movie_photos),
    url(r'^movies/videos/(?P<pk>[0-9]+)$',views.movie_videos),
    url(r'^actors/$',views.actor_list),
    url(r'^movies/recent_ten$',views.recent_ten),
    url(r'^movies/upcoming$',views.upcoming),
    url(r'^movies/top-ten$',views.top_ten),
    url(r'^movies/opening$',views.this_week),
    url(r'^movies/(?P<pk>[0-9]+)$',views.single_movie),


    url(r'^movies/reviews/(?P<pk>[0-9]+)$',views.movie_reviews),
    url(r'^users/add-movie-review$', views.add_movie_review),


    url(r'^login_user/*',views.login_user),
    url(r'^add-user$', views.add_user),

    url(r'^snippets/$', views.snippet_list),
    url(r'^snippets/(?P<pk>[0-9]+)$', views.snippet_detail),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns = format_suffix_patterns(urlpatterns)
