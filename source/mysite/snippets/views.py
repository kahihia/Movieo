from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from snippets.models import *
from snippets.serializers import *
import datetime
#import date
import json
from datetime import timedelta
"""import urllib.request"""


"""from django.shortcuts import render
from django.contrib import auth
from django.http import HttpResponse
from django.contrib.auth import views as auth_views
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

# Create your views here.
from snippets.forms import UserProfileForm, UserForm, LoginForm
from django.core.mail import send_mail
from datetime import datetime, timedelta
from django.utils import timezone
"""



@csrf_exempt
def snippet_list(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a snippet instance.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def actor_list(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        actors = Actor.objects.all()
        serializer = ActorSerializer(actors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ActorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def single_movie(request, pk):
    """ View Details of a single movie """
    try: 
        single_movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    #print (request.data)
    if request.method == 'GET':
        serializer = MovieSerializer(single_movie)
        try:
            writer_name = Actor.objects.get(pk=serializer.data['written_by'])
            writer_name = ActorSerializer(writer_name).data['name']
        except Actor.DoesNotExist:
            writer_name = "Not Available"
        try:
            director_name = Actor.objects.get(pk=serializer.data['directed_by'])
            director_name = ActorSerializer(director_name).data['name']
        except Actor.DoesNotExist:
            director_name = "Not Available"
        return Response([serializer.data, {'director': director_name, 'writer': writer_name} ])



@api_view(['GET'])
def recent_ten(request):
    """
    List most recent 10 movies starting from today
    """
    if request.method == 'GET':
        movies = Movie.objects.filter(date_of_release__lte=datetime.date.today())
        movies = movies.order_by('-date_of_release')[:5]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def top_ten(request):
    """
    List top 10 movies sorted by rating
    """
    if request.method == 'GET':
        movies = Movie.objects.filter(date_of_release__lte=datetime.date.today())
        movies = movies.order_by('-rating')[:10]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def this_week(request):
    """
    5 movies opening this week
    """
    if request.method == 'GET':
        movies = Movie.objects.filter(date_of_release__gte=(datetime.date.today()), date_of_release__lte=(datetime.date.today()+timedelta(days=7)))
        movies = movies.order_by('budget')[:5]
        serializer = MovieSerializer(movies, many=True)
        return_obj = serializer.data
        return Response(return_obj)


@api_view(['GET'])
def upcoming(request):
    """
    upcoming movies after this week
    """
    if request.method == 'GET':
        movies = Movie.objects.filter(date_of_release__gte=(datetime.date.today()+timedelta(days=8)))
        movies = movies.order_by('budget')[:7]
        serializer = MovieSerializer(movies, many=True)
        return_obj = serializer.data
        return Response(return_obj)


@api_view(['GET'])
def cast_details(request, pk):
    """
    Cast details for a specific movie
    """
    if request.method == 'GET':
        cast_list = CastDetails.objects.filter(movie_id=pk)
        serializer = CastDetailsSerializer(cast_list, many=True)
        return_obj = list(serializer.data)
        for i in return_obj:
            i['actor_name'] = (Actor.objects.get(pk=i['actor_id'])).name
            i['image_link'] =  (str((Actor.objects.get(pk=i['actor_id'])).poster))
        return Response(return_obj)


@api_view(['GET'])
def top_box(request):
    """
    10 highest grossing movies
    """
    if request.method == 'GET':
        movies = Movie.objects.all()
        movies = movies.order_by('-box_office')[:10]
        serializer = MovieSerializer(movies, many=True)
        return_obj = serializer.data
        return Response(return_obj)


@api_view(['GET'])
def movie_search(request):
    """
    movie Search
    """
    if request.method == 'GET':
        query_string = request.GET.urlencode()
        query_string = query_string.split('=')[1]
        query_string = query_string.replace('+',' ')
        print (query_string)
        """query_string = urllib.request.unquote(query_string)
        print (query_string)"""
        if len(query_string) == 0:
            return Response()
        movies = Movie.objects.filter(name__icontains=query_string)
        movies = movies.order_by('-rating')[:6]
        serializer = MovieSerializer(movies, many=True)
        return_obj = serializer.data
        return Response(return_obj)


@api_view(['GET'])
def actor_search(request):
    """
    actor Search
    """
    if request.method == 'GET':
        query_string = request.GET.urlencode()
        query_string = query_string.split('=')[1]
        if len(query_string) == 0:
            return Response()
        actors = Actor.objects.filter(name__icontains=query_string)
        actors = actors.order_by('-rating')[:6]
        serializer = ActorSerializer(actors, many=True)
        return_obj = serializer.data
        return Response(return_obj)


@api_view(['GET'])
def movie_photos(request, pk):
    """
    All photos for a specific movie
    """
    if request.method == 'GET':
        photos_list = MoviePhotos.objects.filter(movie_id=pk)
        serializer = MoviePhotosSerializer(photos_list, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def movie_videos(request, pk):
    """
    All photos for a specific movie
    """
    if request.method == 'GET':
        videos_list = MovieVideos.objects.filter(movie_id=pk)
        serializer = MovieVideosSerializer(videos_list, many=True)
        return Response(serializer.data)




"""ACTOR API'S"""
@api_view(['GET','POST'])
def actor_list(request , pk):
    """
    Single actor details
    """
    try:
        actors = Actor.objects.get(pk=pk)
    except Actor.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ActorSerializer(actors)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ActorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def recentmovies(request , actor_id):
    try:
        actors = CastDetails.objects.filter(actor_id=actor_id)
    except CastDetails.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CastDetailsSerializer(actors , many=True)
        length = len(serializer.data)
        list = []
        for i in range(0,length):
            movieid = serializer.data[i]['movie_id']
            movies = Movie.objects.get(pk=movieid)
            serializer2 = MovieSerializer(movies)
            dateofrelease = serializer2.data['date_of_release']
            dict = {'date':dateofrelease , 'movieid':movieid}
            list.append(dict)
        list.sort(key=lambda item:item['date'])
        list1=[]
        for i in range(length):
            list1.append(list[i]['movieid'])
            if i==9:
                break
        movielist = Movie.objects.filter(pk__in=list1)
        serializer3 = MovieSerializer(movielist , many=True)
        return Response(serializer3.data)



@api_view(['GET','POST'])
def actorphotos(request , actor_id):
    """
    Photos of single actor
    """
    try:
        actors = ActorPhotos.objects.filter(actor_id=actor_id)
    except ActorPhotos.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ActorPhotosSerializer(actors , many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ActorPhotosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def actorvideos(request , actor_id):
    """
    List all snippets, or create a new snippet.
    """
    try:
        actors = ActorVideos.objects.filter(actor_id=actor_id)
    except ActorVideos.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ActorVideosSerializer(actors , many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ActorVideosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','POST'])
def allmovies(request , actor_id):
    try:
        actors = CastDetails.objects.filter(actor_id=actor_id)
    except CastDetails.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CastDetailsSerializer(actors , many=True)
        length = len(serializer.data)
        list = []
        for i in range(0,length):
            movieid = serializer.data[i]['movie_id']
            movies = Movie.objects.get(pk=movieid)
            serializer2 = MovieSerializer(movies)
            dateofrelease = serializer2.data['date_of_release']
            dict = {'date':dateofrelease , 'movieid':movieid}
            list.append(dict)
        list.sort(key=lambda item:item['date'])
        list1=[]
        for i in range(length):
            list1.append(list[i]['movieid'])
        movielist = Movie.objects.filter(pk__in=list1)
        serializer3 = MovieSerializer(movielist , many=True)
        return Response(serializer3.data)


@api_view(['GET','POST'])
def actorquotes(request , actor_id):
    """
    List all snippets, or create a new snippet.
    """
    try:
        actors = ActorQuotes.objects.filter(actor_id=actor_id)
    except ActorQuotesSerializer.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ActorQuotesSerializer(actors , many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ActorQuotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_movie_review(request):
    """
    Add a review for a movie by a user
    
    """
    print (json.loads(request.body))
    serializer = MovieReviewsSerializer(data=json.loads(request.body))
    if serializer.is_valid():
        serializer.save()
        return HttpResponse("done")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def movie_reviews(request, pk):
    """ View all reviews of a single movie """    
    try:
        reviews = MovieReviews.objects.filter(movie_id=pk)
    except MovieReviews.DoesNotExist:
        return HttpResponse(status=404)
    serializer = MovieReviewsSerializer(reviews , many=True)
    length = len(serializer.data)
    for i in range(0,length):
        serializer.data[i]['created'] = str(serializer.data[i]['created']).split('T')[0]
        #print (serializer.data[i]['created'])
        temp = serializer.data[i]['user_id']
        users = User.objects.get(pk=temp)
        serializer.data[i]['name_of_user'] = str(users)
    return Response(serializer.data)
