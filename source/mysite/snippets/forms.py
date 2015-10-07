from snippets.models import *
from django import forms

class ActorForm(forms.ModelForm):
    class Meta:
        model = Actor
        exclude = []


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        exclude = []

class CastDetailsForm(forms.ModelForm):
    class Meta:
        model = CastDetails
        exclude = []

class MoviePhotosForm(forms.ModelForm):
    class Meta:
        model = MoviePhotos
        exclude = []

class MovieVideosForm(forms.ModelForm):
    class Meta:
        model = MovieVideos
        exclude = []

class ActorPhotosForm(forms.ModelForm):
    class Meta:
        model = ActorPhotos
        exclude = []

class ActorVideosForm(forms.ModelForm):
    class Meta:
        model = ActorVideos
        exclude = []


