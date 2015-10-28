# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0003_auto_20151006_1751'),
    ]

    operations = [
        migrations.AddField(
            model_name='moviereviews',
            name='rating',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)]),
        ),
        migrations.AlterField(
            model_name='actor',
            name='poster',
            field=models.ImageField(upload_to='snippets/static/photos/actors/posters', default='snippets/static/no_image.jpg'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='poster',
            field=models.ImageField(upload_to='snippets/static/photos/movies/posters', default='snippets/static/photos/no_image.jpg'),
        ),
    ]
