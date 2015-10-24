from django.contrib import admin
from .models import *
from .forms import *
# Register your models here.
class ActorAdmin(admin.ModelAdmin):
    list_display = ['name','rating','poster']
    exclude = ()
    form = ActorForm

admin.site.register(Actor, ActorAdmin)

