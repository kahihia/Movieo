# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import snippets.models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0007_auto_20151007_1803'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='poster',
            field=models.ImageField(default=b'snippets/static/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
        migrations.AlterField(
            model_name='actorphotos',
            name='photo',
            field=models.ImageField(default=b'snippets/static/photos/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
        migrations.AlterField(
            model_name='movie',
            name='poster',
            field=models.ImageField(default=b'mysite/snippets/static/photos/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
        migrations.AlterField(
            model_name='moviephotos',
            name='photo',
            field=models.ImageField(default=b'snippets/static/photos/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
    ]
