from rest_framework import serializers
from snippets.models import *

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'gender', 'birthday', 'hometown', 'about_me', 'no_of_reviews', 'no_of_quotes', 'badge', 'email')

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('name', 'birthday', 'birth_place', 'description', 'wiki_link', 'poster', 'rating')

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('created', 'name', 'language', 'country', 'runtime', 'no_of_reviews', 'written_by', 'directed_by', 'date_of_release', 'description', 'genre', 'rating', 'budget', 'box_office', 'poster')

class MoviePhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoviePhotos
        fields = ('movie_id', 'description', 'photo')

class MovieVideosSerializer(serializers.ModelSerializer):
    class Meta:
            model = MovieVideos
            fields = ('movie_id', 'description', 'video_link')

class MovieQuotesSerializer(serializers.ModelSerializer):
        class Meta:
            model = MovieQuotes
            fields = ('created', 'movie_id', 'user_id', 'description')

class MovieReviewsSerializer(serializers.ModelSerializer):
        class Meta:
            model = MovieReviews
            fields = ('created', 'movie_id', 'user_id', 'description')

class ReviewCommentsSerializer(serializers.ModelSerializer):
        class Meta:
            model = ReviewComments
            fields = ('created', 'review_id', 'user_id', 'description')

class ActorPhotosSerializer(serializers.ModelSerializer):
        class Meta:
            model = ActorPhotos
            fields = ('actor_id', 'description', 'photo')

class ActorVideosSerializer(serializers.ModelSerializer):
        class Meta:
            model = ActorVideos
            fields = ('actor_id', 'description', 'video_link')

class ActorQuotesSerializer(serializers.ModelSerializer):
        class Meta:
            model = ActorQuotes
            fields = ('created', 'actor_id', 'user_id', 'description')

class CastDetailsSerializer(serializers.ModelSerializer):
        class Meta:
            model = CastDetails
            fields = ('actor_id', 'movie_id', 'appears_as', 'role')

class ToWatchListSerializer(serializers.ModelSerializer):
        class Meta:
            model = ToWatchList
            fields = ('user_id', 'movie_id')

