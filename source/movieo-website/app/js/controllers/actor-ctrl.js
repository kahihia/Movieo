/**
 * Created by umeshksingla on 21/11/15.
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
    $scope.actorPhotos = [];

    function ratings(n, obj){
        n = n/2;
        obj.full = parseInt(n);
        obj.empty = 5 - Math.ceil(n);
        obj.half = Math.ceil(n) - parseInt(n);
    }

    $scope.range = function(n) {
        return new Array(n);
    };

    $http.get(baseURL+'/actors/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actor = data.data;
                $scope.poster = $scope.actor.poster.replace(strToReplace, baseURL);
            }
        });

    $http.get(baseURL+'/actors/photos/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorPhotos = data.data;
                $scope.actorPhotos.forEach(function (photo) {
                    photo.photo = photo.photo.replace(strToReplace, baseURL);
                    //console.log(photo.photo);
                })
            }
        });

/*    $http.get(baseURL+'/actors/videos/' + $stateParams.movie_id)
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
        });*/
    $http.get(baseURL+'/actors/recent-movies/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorRecentMovies = data.data;
                $scope.actorRecentMovies.forEach(function (photo) {
                    photo.poster = photo.poster.replace(strToReplace, baseURL);
                    console.log(photo.poster);
                    var n = photo.rating / 2;
                    photo.full = parseInt(n);
                    photo.empty = 5 - Math.ceil(n);
                    photo.half = Math.ceil(n) - parseInt(n);
                })
            }
        });

    $http.get(baseURL+'/actors/all-movies/' + $stateParams.actor_id)
        .then(function (data) {
            console.log(data);
            if(data.status == 200){
                $scope.actorAllMovies = data.data;
                $scope.actorAllMovies.forEach(function (photo) {
                    photo.poster = photo.poster.replace(strToReplace, baseURL);
                    console.log(photo.poster);
                })
            }
        });
}]);
