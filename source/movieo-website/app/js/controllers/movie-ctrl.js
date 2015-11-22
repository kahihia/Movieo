/**
 * Created by umeshksingla on 19/11/15.
 */
App.controller('movieController',['$scope','$timeout','$http','$rootScope', '$stateParams', '$interval',function ($scope, $timeout, $http, $rootScope, $stateParams, $interval) {
    'use strict';


    $scope.Guest = !checkCookie();
    console.log($scope.Guest);

    $scope.movieTweets = [];

    var myVar = setInterval(myTimer, 1000);

    function myTimer() {

        $scope.Guest = !checkCookie();

        $scope.newReview.user_id = logged_in_user.id;
        $scope.newReview.user_name= logged_in_user.name;

        $scope.$apply();
    }

    $scope.newReview = {
        id:'',
        movie_id:$stateParams.movie_id,
        rating: 1,
        description:'',
        user_id: logged_in_user.id,
        user_name: logged_in_user.name,
        created:'',
        positivity:''
    };

    console.log($scope.newReview);
    console.log(logged_in_user);

    function ratings(n){
        n = n/2;
        $scope.movie.full = parseInt(n);
        $scope.movie.empty = 5 - Math.ceil(n);
        $scope.movie.half = Math.ceil(n) - parseInt(n);
        console.log(n, $scope.movie.full, $scope.movie.empty, $scope.movie.half);
    }

    $scope.range = function(n) {
        return new Array(n);
    };

    $scope.movie = {
        id:'',
        name: '',
        rating:'',
        date_of_release:'',
        description: '',
        genre: '',
        directed_by: '',
        written_by: '',
        no_of_reviews:'',
        box_office:'',
        budget:'',
        country:'',
        created:'',
        language:'',
        poster:'',
        runtime:'',
        director:'',
        writer:'',
        half:'',
        full:'',
        empty:'',
        tagline:''
    };

    $scope.poster='';
    $scope.cover='';

    /* get movie details */
    $http.get(baseURL+'/movies/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.movie = data.data[0];
                $scope.movie.rating /= 2;
                $scope.poster = $scope.movie.poster.replace(strToReplace, baseURL);
                $scope.cover = $scope.movie.cover.replace(strToReplace, baseURL);
                console.log( $scope.poster);
                //console.log( $scope.cover);
                $scope.movie.director = data.data[1].director;
                $scope.movie.writer = data.data[1].writer;
                console.log(data.data[0].rating);
                console.log($scope.movie);
                ratings($scope.movie.rating * 2);
            }
        });

    /*get cast details of the movie*/
    $http.get(baseURL+'/movies/cast/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.movieCast = data.data;
                $scope.movieCast.forEach(function (photo) {
                    photo.image_link = photo.image_link.replace(strToReplace, baseURL);
                    console.log(photo.image_link);
                })
            }
        });

    /*get photos for that movie*/
    $http.get(baseURL+'/movies/photos/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.moviePhotos = data.data;
                $scope.moviePhotos.forEach(function (photo) {
                    photo.photo = photo.photo.replace(strToReplace, baseURL);
                    //console.log(photo.photo);
                })
            }
        });
     /*get reviews for that movie*/

    function moviereviews() {
        $http.get(baseURL + '/movies/reviews/' + $stateParams.movie_id)
            .then(function (data) {
                console.log(data);
                if (data.status == 200) {
                    $scope.movieReviews = data.data;
                }
            });
    }

    function movietweets() {
        $http.get(baseURL + '/movie-tweet/' + $stateParams.movie_id)
            .then(function (data) {
                console.log(data);
                if (data.status == 200) {
                    $scope.movieTweets = data.data;
                }
            });
    }

    $scope.createReview = function () {
        $scope.Guest = !checkCookie();
        if(!checkCookie){
            alert('you need to log in first.')
        }
        if($scope.newReview.description.length >= 40) {

            console.log($scope.newReview);

            $http.post(baseURL + '/users/add-movie-review',{
                movie_id : $scope.newReview.movie_id,
                user_id : logged_in_user.id,
                description : $scope.newReview.description,
                rating : $scope.newReview.rating
            }).then(
                function (data) {
                    $scope.error = '';
                    console.log(data);

                    $scope.newReview.id = data.data[0].id;
                    $scope.newReview.created = data.data[0].created;
                    $scope.newReview.rating = data.data[0].rating;
                    $scope.newReview.positivity = '46';
                    //$scope.movieReviews.push(JSON.parse(JSON.stringify($scope.newReview)));

                    $scope.error = '';
                    $scope.newReview={
                        movie_id:$stateParams.movie_id,
                        rating: '',
                        description:'',
                        user_id: logged_in_user.id,
                        user_name: logged_in_user.name
                    };
                    moviereviews();
                }, function (error) {
                    $scope.error = "Some Error Occurred";
                });
        }
        else{
            $scope.error = "Review can't be less than 40 characters";
        }
    };
    moviereviews();
    movietweets();
}]);