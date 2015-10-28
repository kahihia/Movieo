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


admin.site.register(Movie, MovieAdmin)
admin.site.register(CastDetails, CastDetailsAdmin)
admin.site.register(ActorPhotos, ActorPhotosAdmin)
admin.site.register(ActorVideos, ActorVideosAdmin)
admin.site.register(MoviePhotos, MoviePhotosAdmin)
admin.site.register(MovieVideos, MovieVideosAdmin)
