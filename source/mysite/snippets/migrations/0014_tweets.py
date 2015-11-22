# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0013_moviereviews_positivity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tweets',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(default=b'Not Available', max_length=500)),
                ('name', models.CharField(default=b'Not Available', max_length=500)),
                ('created_at', models.CharField(default=b'Not Available', max_length=100)),
                ('profile_img', models.CharField(default=b'Not Available', max_length=1000)),
                ('movie_id', models.ForeignKey(to='snippets.Movie')),
            ],
        ),
    ]
