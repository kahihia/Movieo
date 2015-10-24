# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0002_auto_20151006_1656'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='no_of_reviews',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0)], default=0),
        ),
    ]
