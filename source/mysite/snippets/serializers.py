from rest_framework import serializers
from snippets.models import *

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'gender', 'birthday', 'hometown', 'about_me', 'no_of_reviews', 'no_of_quotes', 'badge', 'email')

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('id', 'name', 'birthday', 'birth_place', 'description', 'wiki_link', 'poster', 'rating')

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'created', 'name', 'language', 'country', 'runtime', 'no_of_reviews', 'written_by', 'directed_by', 'date_of_release', 'description', 'genre', 'rating', 'budget', 'box_office', 'poster')

class MoviePhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoviePhotos
        fields = ('id', 'movie_id', 'description', 'photo')

class MovieVideosSerializer(serializers.ModelSerializer):
    class Meta:
            model = MovieVideos
            fields = ('id', 'movie_id', 'description', 'video_link')

class MovieQuotesSerializer(serializers.ModelSerializer):
        class Meta:
            model = MovieQuotes
            fields = ('id', 'created', 'movie_id', 'user_id', 'description')

class MovieReviewsSerializer(serializers.ModelSerializer):
        class Meta:
            model = MovieReviews
            fields = ('id', 'created', 'movie_id', 'user_id', 'description')

class ReviewCommentsSerializer(serializers.ModelSerializer):
        class Meta:
            model = ReviewComments
            fields = ('id', 'created', 'review_id', 'user_id', 'description')

class ActorPhotosSerializer(serializers.ModelSerializer):
        class Meta:
            model = ActorPhotos
            fields = ('id', 'actor_id', 'description', 'photo')

class ActorVideosSerializer(serializers.ModelSerializer):
        class Meta:
            model = ActorVideos
            fields = ('id', 'actor_id', 'description', 'video_link')

class ActorQuotesSerializer(serializers.ModelSerializer):
        class Meta:
            model = ActorQuotes
            fields = ('id', 'created', 'actor_id', 'user_id', 'description')

class CastDetailsSerializer(serializers.ModelSerializer):
        class Meta:
            model = CastDetails
            fields = ('id', 'actor_id', 'movie_id', 'appears_as', 'role')

class ToWatchListSerializer(serializers.ModelSerializer):
        class Meta:
            model = ToWatchList
            fields = ('id', 'user_id', 'movie_id')

