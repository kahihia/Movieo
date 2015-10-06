from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

    class Meta:
        ordering = ('created',)

""" User Table """
class User(models.Model):
    name = models.CharField(max_length=200, blank=False)
    gender = models.CharField(max_length=200, default='Not Specified')
    birthday = models.DateField()
    hometown = models.CharField(default='Not Available', max_length=200)
    about_me = models.TextField(max_length=5000, blank=True)
    no_of_reviews = models.IntegerField(default=0)
    no_of_quotes = models.IntegerField(default=0)
    badge = models.IntegerField(default=0)
    email = models.CharField(max_length=200, null=False)


""" Actor Table """
class Actor(models.Model):
    name = models.CharField(max_length=200)
    birthday = models.DateField()
    birth_place = models.CharField(default='Not Available', max_length=200)
    description = models.TextField(max_length=5000, blank=True)
    wiki_link = models.CharField(default='Not Available', max_length=200)
    poster = models.ImageField(upload_to='photos/actors/posters', default='photos/no_image.jpg')  
    rating = models.FloatField( validators = [MinValueValidator(1.0), MaxValueValidator(10.0)] )


"""Movie Tables"""
class Movie(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200, blank=False)
    language = models.CharField(max_length=100, blank=False)
    country = models.CharField(max_length=100, blank=False)
    runtime = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    no_of_reviews = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    written_by = models.ForeignKey(Actor, related_name='writer')
    directed_by = models.ForeignKey(Actor, related_name='director')
    date_of_release = models.DateField()
    description = models.TextField(max_length=5000)
    genre = models.CharField(max_length=200)
    rating = models.FloatField( validators = [MinValueValidator(1.0), MaxValueValidator(10.0)] )
    budget = models.IntegerField(default=0)
    box_office = models.IntegerField(default=0)
    poster = models.ImageField(upload_to='photos/movies/posters', default='photos/no_image.jpg')

class MoviePhotos(models.Model):
    movie_id = models.ForeignKey(Movie)
    description = models.TextField(max_length=5000, blank=True)
    photo = models.ImageField(upload_to='photos/movies', default='photos/no_image.jpg')


class MovieVideos(models.Model):
    movie_id = models.ForeignKey(Movie)
    description = models.TextField(max_length=5000, blank=True)
    video_link = models.CharField(max_length=1000)

class MovieQuotes(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    movie_id = models.ForeignKey(Movie)
    user_id = models.ForeignKey(User)
    description = models.TextField(max_length=5000, blank=True)


class MovieReviews(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    movie_id = models.ForeignKey(Movie)
    user_id = models.ForeignKey(User)
    description = models.TextField(max_length=5000, blank=True)

class ReviewComments(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    review_id = models.ForeignKey(MovieReviews)
    user_id = models.ForeignKey(User)
    description = models.TextField(max_length=5000, blank=True)



"""Actor Tables"""


class ActorPhotos(models.Model):
    actor_id = models.ForeignKey(Actor)
    description = models.TextField(max_length=5000, blank=True)
    photo = models.ImageField(upload_to='photos/actors', default='photos/no_image.jpg')


class ActorVideos(models.Model):
    actor_id = models.ForeignKey(Actor)
    description = models.TextField(max_length=5000, blank=True)
    video_link = models.CharField(max_length=1000)


class ActorQuotes(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    actor_id = models.ForeignKey(Actor)
    user_id = models.ForeignKey(User)
    description = models.TextField(max_length=5000, blank=True)


""" Join of tables Movie and Actors"""
class CastDetails(models.Model):
    actor_id = models.ForeignKey(Actor)
    movie_id = models.ForeignKey(Movie)
    appears_as = models.CharField(max_length=1000, default='Not Available')
    role = models.CharField(max_length=1000, default='Not Available')



class ToWatchList(models.Model):
    user_id = models.ForeignKey(User)
    movie_id = models.ForeignKey(Movie)
