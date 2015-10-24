from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=128, unique=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)

    def __unicode__(self):
        return self.name


class Page(models.Model):
    category = models.ForeignKey(Category)
    title = models.CharField(max_length=128)
    url = models.URLField()
    views = models.IntegerField(default=0)

    def __unicode__(self):
        return self.title


class UserProfile(models.Model):
    # A required line - links a UserProfile to User.
    user = models.OneToOneField(User)

    # The additional attributes we wish to include.
    website = models.URLField(blank=True)
    picture = models.ImageField(upload_to='profile_images', blank=True)

    def __unicode__(self):
        return self.user.username


class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User)
    language = models.CharField(max_length=20)


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
    movie_id = models.ForeignKey(MovieInfo)

