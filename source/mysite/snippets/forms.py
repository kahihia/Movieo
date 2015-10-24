from snippets.models import *
from django import forms

class ActorForm(forms.ModelForm):
    class Meta:
        model = Actor
        exclude = []



