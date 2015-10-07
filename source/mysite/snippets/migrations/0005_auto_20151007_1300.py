# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0004_auto_20151007_1137'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actorphotos',
            name='photo',
            field=models.ImageField(default='snippets/static/photos/no_image.jpg', upload_to='snippets/static/photos/actors'),
        ),
        migrations.AlterField(
            model_name='moviephotos',
            name='photo',
            field=models.ImageField(default='snippets/static/photos/no_image.jpg', upload_to='snippets/static/photos/movies'),
        ),
    ]
