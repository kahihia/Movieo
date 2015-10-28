# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('snippets', '0005_auto_20151007_1300'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('gender', models.CharField(default='Not Specified', max_length=200)),
                ('birthday', models.DateField()),
                ('hometown', models.CharField(default='Not Available', max_length=200)),
                ('about_me', models.TextField(blank=True, max_length=5000)),
                ('no_of_reviews', models.IntegerField(default=0)),
                ('no_of_quotes', models.IntegerField(default=0)),
                ('badge', models.IntegerField(default=0)),
            ],
        ),
        migrations.AlterField(
            model_name='actorquotes',
            name='user_id',
            field=models.ForeignKey(to='snippets.UserProfile'),
        ),
        migrations.AlterField(
            model_name='moviequotes',
            name='user_id',
            field=models.ForeignKey(to='snippets.UserProfile'),
        ),
        migrations.AlterField(
            model_name='moviereviews',
            name='user_id',
            field=models.ForeignKey(to='snippets.UserProfile'),
        ),
        migrations.AlterField(
            model_name='reviewcomments',
            name='user_id',
            field=models.ForeignKey(to='snippets.UserProfile'),
        ),
        migrations.AlterField(
            model_name='towatchlist',
            name='user_id',
            field=models.ForeignKey(to='snippets.UserProfile'),
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
        ),
    ]
