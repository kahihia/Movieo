from django import forms

class FinalForm(forms.Form):
    hashtag = forms.CharField(max_length=100)
    fromdate = forms.DateField()
    todate = forms.DateField()

