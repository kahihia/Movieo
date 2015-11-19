from django.db import models

# Create your models here.


class takeHashTags(models.Model):
    hashtag=models.CharField(max_length=100,blank=False,null=False)

    def __unicode__(self):
        return self.hashtag

    def changeHash(self):
        a=self.hashtag.split(',')[0]
        return a