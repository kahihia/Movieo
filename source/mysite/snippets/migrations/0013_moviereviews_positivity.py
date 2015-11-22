# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0012_auto_20151121_2120'),
    ]

    operations = [
        migrations.AddField(
            model_name='moviereviews',
            name='positivity',
            field=models.IntegerField(default=0),
        ),
    ]
