from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime

# Create your models he
class UserProfile(models.Model):
    User._meta.get_field('username').max_length = 75
    User._meta.get_field('email')._unique = True
    user = models.OneToOneField(User)
    gender_choises = (('M','Male'),('F','Female'),)
    gender = models.CharField(max_length=1,choices=gender_choises)
    birth_date = models.DateField(blank=True, null=True)
    hometown = models.CharField(max_length=100)
    aboutme = models.TextField(max_length=5000)

    
    # def __unicode__(self):
    #     return self.user.username


class MovieInfo(models.Model):
    id = models.AutoField(primary_key=True)
    movie_name = models.CharField(max_length=100)
    date_of_release = models.DateField()
    director = models.CharField(max_length=100)
    storyline = models.TextField()
    runtime = models.DurationField(null=True , blank=True)
    genre = models.CharField(max_length=100)
    main_photo = models.ImageField(upload_to='Pictures/movieo/', null=True)
    trailer = models.FileField(upload_to='Videos/movieo/', null=True)

    def __unicode__(self):
        return self.movie_name

class BadgeInfo(models.Model):
    id = models.AutoField(primary_key=True)
    bname = models.CharField(max_length=30,blank=True,null=True)
    btext = models.TextField(blank=True,null=True)

class Badges(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserProfile)
    badge_id = models.ForeignKey(BadgeInfo)


class Photos(models.Model):
    id = models.AutoField(primary_key=True)
    movie_id = models.ForeignKey(MovieInfo)
    photo = models.ImageField(upload_to='Pictures/movieo/', null=False)


class CastProfile(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=200)
    birth_date = models.DateField(null=True, blank=True)
    cast_photo = models.ImageField(upload_to='Pictures/movieo/', blank=True , null=True)
    info = models.TextField()
    def __unicode__(self):
        return self.full_name


class Cast(models.Model):
    id = models.AutoField(primary_key=True)
    movie_id = models.ForeignKey(MovieInfo)
    cast_id = models.ForeignKey(CastProfile, null=True)
    name_in_movie = models.CharField(max_length=100)


class Reviews(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('UserProfile')
    movie_id = models.ForeignKey(MovieInfo)
    review = models.TextField(null=True, blank=True)
    votes = models.IntegerField(null=True)
    rating = models.DecimalField(max_digits=3 ,decimal_places=1 ,  null=True, blank=True)
    approved = models.BooleanField(default=0)


class Watch_list(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('UserProfile')
    movie_id = models.ForeignKey('MovieInfo')


