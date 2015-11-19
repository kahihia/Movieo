# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import snippets.models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0008_auto_20151118_2044'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='cover',
            field=models.ImageField(default=b'mysite/snippets/static/photos/no_image.jpg', upload_to=snippets.models.path_and_rename),
        ),
    ]
