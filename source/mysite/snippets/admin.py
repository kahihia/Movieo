from django.contrib import admin
from .models import *
from .forms import *
# Register your models here.
class ActorAdmin(admin.ModelAdmin):
    list_display = ['name','rating','poster']
    exclude = ()
    form = ActorForm

admin.site.register(Actor, ActorAdmin)


class MovieAdmin(admin.ModelAdmin):
    list_display = ['name','rating','poster','created','description']
    exclude = ()
    form = MovieForm

class CastDetailsAdmin(admin.ModelAdmin):
    list_display = ['movie_id','actor_id','role']
    exclude = ()
    form = CastDetailsForm

class MoviePhotosAdmin(admin.ModelAdmin):
    list_display = ['movie_id','description','photo']
    exclude = ()
    form = MoviePhotosForm

class MovieReviewsAdmin(admin.ModelAdmin):
    list_display = ['created', 'user_id', 'movie_id','description', 'rating', 'positivity']
    exclude = ()
    form = MovieReviewsForm

class MovieVideosAdmin(admin.ModelAdmin):
    list_display = ['movie_id','description','video_link']
    exclude = ()
    form = MovieVideosForm


class ActorPhotosAdmin(admin.ModelAdmin):
    list_display = ['actor_id','description','photo']
    exclude = ()
    form = ActorPhotosForm

class ActorVideosAdmin(admin.ModelAdmin):
    list_display = ['actor_id','description','video_link']
    exclude = ()
    form = ActorVideosForm

class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'gender', 'birthday', 'hometown', 'about_me', 'no_of_reviews', 'no_of_quotes', 'badge', 'email']
    exclude = ()
    form = UserForm

admin.site.register(Movie, MovieAdmin)
admin.site.register(CastDetails, CastDetailsAdmin)
admin.site.register(ActorPhotos, ActorPhotosAdmin)
admin.site.register(ActorVideos, ActorVideosAdmin)
admin.site.register(MoviePhotos, MoviePhotosAdmin)
admin.site.register(MovieVideos, MovieVideosAdmin)
admin.site.register(MovieReviews, MovieReviewsAdmin)
admin.site.register(User, UserAdmin)
