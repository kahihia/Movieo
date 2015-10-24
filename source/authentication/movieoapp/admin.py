from django.contrib import admin

# Register your models here.
from .models import MovieInfo,Cast,CastProfile,Reviews
from .forms import MovieInfoForm,CastForm,CastProfileForm,ReviewsForm

class MovieInfoAdmin(admin.ModelAdmin):
    list_display = ["__unicode__","director","date_of_release"]
    exclude = ()
#    list_display = ["movie_name","director"]
    form = MovieInfoForm

admin.site.register(MovieInfo , MovieInfoAdmin)


class CastAdmin(admin.ModelAdmin):
 #   list_display = ["__unicode__"]
    exclude = ()
    form = CastForm

admin.site.register(Cast , CastAdmin)


class CastProfileAdmin(admin.ModelAdmin):
    list_display = ["__unicode__","cast_photo"]
    exclude = ()
    form = CastForm

admin.site.register(CastProfile , CastProfileAdmin)

class ReviewsAdmin(admin.ModelAdmin):
    list_display = ['review','rating','approved']
    form = ReviewsForm

admin.site.register(Reviews, ReviewsAdmin)