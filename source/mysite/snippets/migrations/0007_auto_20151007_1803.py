# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0006_auto_20151007_1741'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('gender', models.CharField(default='Not Specified', max_length=200)),
                ('birthday', models.DateField()),
                ('hometown', models.CharField(default='Not Available', max_length=200)),
                ('about_me', models.TextField(max_length=5000, blank=True)),
                ('no_of_reviews', models.IntegerField(default=0)),
                ('no_of_quotes', models.IntegerField(default=0)),
                ('badge', models.IntegerField(default=0)),
                ('email', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.AlterField(
            model_name='actorquotes',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AlterField(
            model_name='moviequotes',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AlterField(
            model_name='moviereviews',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AlterField(
            model_name='reviewcomments',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.AlterField(
            model_name='towatchlist',
            name='user_id',
            field=models.ForeignKey(to='snippets.User'),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
