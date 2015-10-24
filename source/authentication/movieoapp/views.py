from django.shortcuts import render
from django.contrib import auth
from django.http import HttpResponse
from django.contrib.auth import views as auth_views
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

# Create your views here.
from movieoapp.forms import UserProfileForm, UserForm, LoginForm
from movieoapp.models import UserProfile, User
from django.core.mail import send_mail
from datetime import datetime, timedelta
from django.utils import timezone


def register(request):
    registered = False
    if request.user.is_authenticated():
        return HttpResponseRedirect('/')
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save(commit=False)
            user.is_staff = False
            user.is_superuser = False
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
        else:
            print user_form.errors
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()
    return render(request,
                  'register.html',
                  {'user_form': user_form, 'profile_form': profile_form, 'registered': registered})


def Login(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect('/')
    userDetails = []
    wrong = ''
    invalid_login = False
    p = 1
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = auth.authenticate(username=form.cleaned_data['username'],
                                     password=form.cleaned_data['password'])
            if user:
                auth.login(request, user)
                intable = True
            else:
                try:
                    x = User.objects.get(username=form.cleaned_data['username'])
                    p = 0
                    wrong = "Please Enter Correct Password"
                except User.DoesNotExist:
                    x = None
                    userDetails = "Please Enter Correct email "
                    # wrong = "Please Enter Correct Password"
                invalid_login = "Invalid login credentials"

    else:
        form = LoginForm()
    context = {
        'userDetails': userDetails,
        'wrong': wrong,
        'invalid_login': invalid_login,
        'form': form,
        'p': p
    }
    if request.user.is_authenticated():
        return HttpResponseRedirect('/')

    return render(request, 'login.html', context)


def home(request):
    togo = 0
    if request.user.is_authenticated():
        togo = 1
    context = {
        'togo': togo
    }
    return render(request, 'home.html', context)


@login_required
def Logout(request):
    logout(request)

    # Take the user back to the homepage.
    return HttpResponseRedirect('/')


