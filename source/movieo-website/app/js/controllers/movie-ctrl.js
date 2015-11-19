/**
 * Created by umeshksingla on 19/11/15.
 */
App.controller('movieController',['$scope','$timeout','$http','$rootScope', '$stateParams',function ($scope, $timeout, $http, $rootScope, $stateParams) {
    'use strict';

    function ratings(n){
        n = n/2;
        $scope.movie.full = parseInt(n);
        $scope.movie.empty = 5 - Math.ceil(n);
        $scope.movie.half = 5 - (parseInt(n) + 5 - Math.ceil(n));
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
                $scope.poster = $scope.movie.poster.replace(strToReplace, baseURL);
                //$scope.cover = $scope.movie.cover.replace(strToReplace, baseURL);
                console.log( $scope.poster);
                //console.log( $scope.cover);
                $scope.movie.director = data.data[1].director;
                $scope.movie.writer = data.data[1].writer;
                console.log(data.data[0].rating);
                console.log($scope.movie);
                ratings($scope.movie.rating);
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

                for(var i = 0;i < data.data.length; i++) {
                    $http.get(baseURL + '/movies/reviews/comments' + data.data[i].id)
                        .then(function (response) {
                            console.log(response);
                            if (data.status == 200) {
                                $scope.movieReviewsComments[data.data[i].id]=(response.data);
                            }
                        });
                }
            }
        });*/
}]);