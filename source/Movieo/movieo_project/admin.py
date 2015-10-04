from django.contrib import admin
from models import Category, Page, UserProfile
from django.contrib.auth.models import User


class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'url')


# admin.site.unregister(User)
admin.site.register(Category)
admin.site.register(Page, PageAdmin)
admin.site.register(UserProfile)
