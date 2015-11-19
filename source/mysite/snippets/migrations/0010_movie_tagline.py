# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0009_movie_cover'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='tagline',
            field=models.CharField(default=b'Tagline', max_length=200),
        ),
    ]
