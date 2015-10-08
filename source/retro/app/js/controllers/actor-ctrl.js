/**
 * Created by umeshksingla on 7/10/15.
 */
App.controller('actorController',['$scope','$timeout','$http','$rootScope', '$stateParams',function ($scope, $timeout, $http, $rootScope, $stateParams) {
    'use strict';

    $scope.actor = {
        id:'',
        name: '',
        rating:'',
        description: '',
        birthday:'',
        birth_place:'',
        poster:'',
        wiki_link:''
    };

    $http.get(baseURL+'/actors/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actor = data.data;
                $scope.poster = $scope.actor.poster.replace("snippets",baseURL);
            }
        });

    $http.get(baseURL+'/actors/photos/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorPhotos = data.data;
            }
        });

    $http.get(baseURL+'/actors/videos/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorVideos = data.data;
            }
        });
    $http.get(baseURL+'/actors/awards/' + $stateParams.movie_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorAwards = data.data;
            }
        });

    $http.get(baseURL+'/actors/quotes/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorQuotes = data.data;
            }
        });
    $http.get(baseURL+'/actors/recent-movies/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorRecentMovies = data.data;
                $scope.actorRecentMovies.forEach(function (photo) {
                    photo.poster = photo.poster.replace("snippets",baseURL);
                    console.log(photo.poster);
                })
            }
        });

    $http.get(baseURL+'/actors/all-movies/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorAllMovies = data.data;
                $scope.actorAllMovies.forEach(function (photo) {
                    photo.poster = photo.poster.replace("snippets",baseURL);
                    console.log(photo.poster);
                })
            }
        });
}]);
