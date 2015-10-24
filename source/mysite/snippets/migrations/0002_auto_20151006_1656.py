# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('birthday', models.DateField()),
                ('birth_place', models.CharField(max_length=200, default='Not Available')),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('wiki_link', models.CharField(max_length=200, default='Not Available')),
                ('poster', models.ImageField(default='photos/no_image.jpg', upload_to='photos/actors/posters')),
                ('rating', models.FloatField(validators=[django.core.validators.MinValueValidator(1.0), django.core.validators.MaxValueValidator(10.0)])),
            ],
        ),
        migrations.CreateModel(
            name='ActorPhotos',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('photo', models.ImageField(default='photos/no_image.jpg', upload_to='photos/actors')),
                ('actor_id', models.ForeignKey(to='snippets.Actor')),
            ],
        ),
        migrations.CreateModel(
            name='ActorQuotes',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('actor_id', models.ForeignKey(to='snippets.Actor')),
            ],
        ),
        migrations.CreateModel(
            name='ActorVideos',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('video_link', models.CharField(max_length=1000)),
                ('actor_id', models.ForeignKey(to='snippets.Actor')),
            ],
        ),
        migrations.CreateModel(
            name='CastDetails',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('appears_as', models.CharField(max_length=1000, default='Not Available')),
                ('role', models.CharField(max_length=1000, default='Not Available')),
                ('actor_id', models.ForeignKey(to='snippets.Actor')),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=200)),
                ('language', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('runtime', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)], default=0)),
                ('no_of_reviews', models.IntegerField(default=0)),
                ('date_of_release', models.DateField()),
                ('description', models.TextField(max_length=5000)),
                ('genre', models.CharField(max_length=200)),
                ('rating', models.FloatField(validators=[django.core.validators.MinValueValidator(1.0), django.core.validators.MaxValueValidator(10.0)])),
                ('budget', models.IntegerField(default=0)),
                ('box_office', models.IntegerField(default=0)),
                ('poster', models.ImageField(default='photos/no_image.jpg', upload_to='photos/movies/posters')),
                ('directed_by', models.ForeignKey(related_name='director', to='snippets.Actor')),
                ('written_by', models.ForeignKey(related_name='writer', to='snippets.Actor')),
            ],
        ),
        migrations.CreateModel(
            name='MoviePhotos',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('photo', models.ImageField(default='photos/no_image.jpg', upload_to='photos/movies')),
                ('movie_id', models.ForeignKey(to='snippets.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieQuotes',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('movie_id', models.ForeignKey(to='snippets.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieReviews',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('movie_id', models.ForeignKey(to='snippets.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieVideos',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('video_link', models.CharField(max_length=1000)),
                ('movie_id', models.ForeignKey(to='snippets.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='ReviewComments',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(max_length=5000, blank=True)),
                ('review_id', models.ForeignKey(to='snippets.MovieReviews')),
            ],
        ),
        migrations.CreateModel(
            name='ToWatchList',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('movie_id', models.ForeignKey(to='snippets.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('gender', models.CharField(max_length=200, default='Not Specified')),
                ('birthday', models.DateField()),
                ('hometown', models.CharField(max_length=200, default='Not Available')),
                ('about_me', models.TextField(max_length=5000, blank=True)),
                ('no_of_reviews', models.IntegerField(default=0)),
                ('no_of_quotes', models.IntegerField(default=0)),
                ('badge', models.IntegerField(default=0)),
                ('email', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='towatchlist',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AddField(
            model_name='reviewcomments',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AddField(
            model_name='moviereviews',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AddField(
            model_name='moviequotes',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AddField(
            model_name='castdetails',
            name='movie_id',
            field=models.ForeignKey(to='snippets.Movie'),
        ),
        migrations.AddField(
            model_name='actorquotes',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
    ]
