# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0014_tweets'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tweets',
            old_name='profile_img',
            new_name='profile_image_url',
        ),
    ]
