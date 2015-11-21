/**
 * Created by umeshksingla on 19/11/15.
 */
App.controller('movieController',['$scope','$timeout','$http','$rootScope', '$stateParams', '$interval',function ($scope, $timeout, $http, $rootScope, $stateParams, $interval) {
    'use strict';


    $scope.Guest = !checkCookie();
    console.log($scope.Guest);

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
        rating: '',
        description:'',
        user_id: logged_in_user.id,
        user_name: logged_in_user.name,
        created_at:'',
        created_on:'',
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
        empty:''
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
                //$scope.cover = $scope.movie.cover.replace(strToReplace, baseURL);
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

    /*    /!*get videos for that movie*!/
     $http.get(baseURL+'/movies/videos/' + $stateParams.movie_id)
     .then(function (data) {
     console.log(data);
     if(data.status == 200){
     $scope.movieVideos = data.data;
     }
     });

     /!*get quotes for that movie*!/
     $http.get(baseURL+'/movies/quotes/' + $stateParams.movie_id)
     .then(function (data) {
     console.log(data);
     if(data.status == 200){
     $scope.movieQuotes = data.data;
     }
     });

     /!*get reviews for that movie*!/
     $http.get(baseURL+'/movies/reviews/' + $stateParams.movie_id)
     .then(function (data) {
     console.log(data);

     if(data.status == 200){
     $scope.movieReviews = data.data;
     $scope.movieReviewsComments = [];

     }
     });*/
    $scope.movieReviews = [{
        id:466,
        movie_id:6,
        rating: '5.4',
        description:'who can cook makes an unusual alliance with a young kitchen worker' +
        'who can cook makes an unusual alliance with a young kitchen worker' +
        ' who can cook makes an unusual alliance with a young kitchen worker',
        user_id: 13,
        user_name: 'Punya Pat',
        positivity: 60.2,
        created_on: '2015-09-11',
        created_at: '11:03'
    }, {
        id:212,
        movie_id:6,
        rating: '8.2',
        description:'who can cook makes an unusual alliance with a young kitchen worker' +
        'who can cook makes an unusual alliance with a young kitchen worker' +
        ' who can cook makes an unusual alliance with a young kitchen worker',
        user_id: 13,
        user_name: 'Battu Varshit',
        positivity: 75.2,
        created_on: '2015-05-01',
        created_at: '13:45'
    }];

    $scope.createReview = function () {
        $scope.Guest = !checkCookie();
        if(!checkCookie){
            alert('you need to log in first.')
        }
        if($scope.newReview.description.length >= 40) {

            console.log($scope.newReview);

            /*$http.post(baseURL + '/add-movie-review',
                $scope.newReview
            ).then(
                function (data) {
                    console.log(data);*/

/*                    $scope.newReview.id = data.data.id;
                    $scope.newReview.created_at = data.data.created_at;
                    $scope.newReview.created_on = data.data.created_on;
                    $scope.newReview.positivity = data.data.positivity;*/

            $scope.newReview.id = 56;
            $scope.newReview.created_at = '12:25';
            $scope.newReview.created_on = '2015-06-17';
            $scope.newReview.positivity = '46';
                    $scope.movieReviews.push($scope.newReview);

                    $scope.error = '';
                    $scope.newReview={
                        movie_id:$stateParams.movie_id,
                        rating: '',
                        description:'',
                        user_id: logged_in_user.id,
                        user_name: logged_in_user.name
                    };
                /*
                }, function (error) {
                    $scope.error = "Some Error Occurred";
                });*/
        }
        else{
            $scope.error = "Review can't be less than 40 characters";
        }
    };

}]);