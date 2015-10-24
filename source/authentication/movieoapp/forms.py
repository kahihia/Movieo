from django import forms
from .models import MovieInfo,Cast,CastProfile,Reviews,UserProfile
from django.contrib.auth.models import User

class MovieInfoForm(forms.ModelForm):
    class Meta:
        model = MovieInfo
   #     fields = ['movie_name','director','date_of_release','runtime','storyline','main_photo','trailer']
        exclude = []


class UserForm(forms.ModelForm):
    username = forms.CharField(label='',widget=forms.TextInput(attrs={'placeholder': 'username'}))
    email = forms.EmailField(label='',widget=forms.TextInput(attrs={'placeholder': 'email'}),error_messages={'required': 'Please enter a Valid Email'})
    password = forms.CharField(label='',widget=forms.PasswordInput(attrs={'placeholder': 'password'}),error_messages={'required': 'Please enter password'})
    class Meta:
        model = User
        fields = ['username','email','password']

class UserProfileForm(forms.ModelForm):
    gender = forms.CharField(label='',widget=forms.TextInput(attrs={'placeholder': 'gender'}))
    birth_date = forms.DateField(label='',widget=forms.DateInput(attrs={'placeholder': 'date of birth'}))
    hometown = forms.CharField(label='',widget=forms.TextInput(attrs={'placeholder': 'hometown'}))
    aboutme = forms.CharField(label='',widget=forms.TextInput(attrs={'placeholder': 'about_me'}))
    class Meta:
        model = UserProfile
        fields = ['birth_date','gender','hometown','aboutme']

class LoginForm(forms.ModelForm):
    username = forms.CharField(
                                max_length = 75,
                                label='',
                                error_messages = {'required':'Enter Valid Email.'},
                                widget=forms.TextInput(attrs={'placeholder': 'Email'}))
    password = forms.CharField(
                               max_length = 128,
                               widget = forms.PasswordInput(attrs={'placeholder': 'password'}),
                               error_messages = {'required':'Enter password.'},
                               label = '')
    # remember_user = forms.BooleanField(required = False,
    #
    #                                    label = 'Remember Me',widget = forms.CheckboxInput(attrs={'type':'checkbox'}))
    class Meta:
        model = UserProfile
        fields = ['username','password']

class CastForm(forms.ModelForm):
    class Meta:
        model = Cast
        exclude = []

class CastProfileForm(forms.ModelForm):
    class Meta:
        model = Cast
        exclude = []

class ReviewsForm(forms.ModelForm):
    class Meta:
        model = Reviews
        exclude = []
