App.controller('movieController',['$scope','$timeout','$http','$rootScope', '$stateParams',function ($scope, $timeout, $http, $rootScope, $stateParams) {
    'use strict';

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
        writer:''
    };

    $scope.poster=''

    $scope.ratings = {
        current: 7.5,
        max: 10
    };

    $http.get(baseURL+'/movies/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.movie = data.data[0];
                $scope.poster = $scope.movie.poster.replace("snippets",baseURL);
                console.log( $scope.poster);
                $scope.movie.director = data.data[1].director;
                $scope.movie.writer = data.data[1].writer;
                $scope.ratings.current = data.data[0].rating;
                console.log(data.data[0].rating);
            }
        });

    $http.get(baseURL+'/movies/cast/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.movieCast = data.data;
                $scope.movieCast.forEach(function (photo) {
                    photo.image_link = photo.image_link.replace("snippets",baseURL);
                    console.log(photo.image_link);
                })
            }
        });

    $http.get(baseURL+'/movies/photos/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.moviePhotos = data.data;
                $scope.moviePhotos.forEach(function (photo) {
                    photo.photo = photo.photo.replace("snippets",baseURL);
                    //console.log(photo.photo);
                })
            }
        });

    $http.get(baseURL+'/movies/videos/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.movieVideos = data.data;
            }
        });

    $http.get(baseURL+'/movies/quotes/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.movieQuotes = data.data;
            }
        });

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
        });
}]);