# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import snippets.models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0011_user_auth_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='cover',
            field=models.ImageField(default=b'snippets/static/photos/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
        migrations.AlterField(
            model_name='movie',
            name='poster',
            field=models.ImageField(default=b'snippets/static/photos/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
        migrations.AlterField(
            model_name='user',
            name='auth_token',
            field=models.CharField(default=b'empty', max_length=2000),
        ),
    ]
