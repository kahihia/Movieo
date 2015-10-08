/**
 * Created by umeshksingla on sep 27, 2015.
 */

App.controller('slideShowController',['$scope','$timeout','$http','$rootScope',function ($scope, $timeout, $http, $rootScope) {
    'use strict';

    $scope.article = '1';
    $scope.autoChanges = true;

    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    function TryParseInt(str, defaultValue){
        var retValue = defaultValue;
        if(str!=null){
            if(str.length>0){
                if (!isNaN(str)){
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }

    function doSomething() {
        if($scope.autoChanges){
            switch($scope.article){
                case "1":
                    $scope.article = "2";
                    break;
                case "2":
                    $scope.article = "3";
                    break;
                case "3":
                    $scope.article = "4";
                    break;
                case "5":
                    $scope.article = "5";
                    break;
                default:
                    $scope.article = "1";
            }
        }
        $timeout(doSomething, 1800 + getRandomInt(1000) + TryParseInt($scope.time, 2000));
    }

    $timeout(doSomething, 1800 + getRandomInt(1000) + TryParseInt($scope.time, 2000));

    $scope.recentTenMovies = [];

    $http.get(baseURL + '/movies/recent_ten')
        .then(function (data) {
            console.log(data);
            $scope.recentTenMovies = data.data;
            $scope.recentTenMovies.forEach(function (movie) {
                movie.poster = movie.poster.replace("snippets",baseURL);
            })
        });

}]);

App.controller('slideShowController1',['$scope','$timeout','$http','$rootScope',function ($scope, $timeout, $http, $rootScope) {
    'use strict';

    $scope.article = '1';
    $scope.autoChanges = true;

    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    function TryParseInt(str, defaultValue){
        var retValue = defaultValue;
        if(str!=null){
            if(str.length>0){
                if (!isNaN(str)){
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }

    function doSomething() {
        if($scope.autoChanges){
            switch($scope.article){
                case "1":
                    $scope.article = "2";
                    break;
                case "2":
                    $scope.article = "3";
                    break;
                case "3":
                    $scope.article = "4";
                    break;
                case "5":
                    $scope.article = "5";
                    break;
                default:
                    $scope.article = "1";
            }
        }
        $timeout(doSomething, 2500 + getRandomInt(1000) + TryParseInt($scope.time, 2000));
    }

    $timeout(doSomething, 2500 + getRandomInt(1000) + TryParseInt($scope.time, 2000));

    $scope.topTenMovies = [];

    $http.get(baseURL + '/movies/top-ten')
        .then(function (data) {
            console.log(data);
            $scope.topTenMovies = data.data;
            $scope.topTenMovies.forEach(function (movie) {
                movie.poster = movie.poster.replace("snippets",baseURL);
            })
        });

}]);
App.controller('slideShowController2',['$scope','$timeout','$http','$rootScope',function ($scope, $timeout, $http, $rootScope) {
    'use strict';

    $scope.article = '1';
    $scope.autoChanges = true;

    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    function TryParseInt(str, defaultValue){
        var retValue = defaultValue;
        if(str!=null){
            if(str.length>0){
                if (!isNaN(str)){
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    }

    function doSomething() {
        if($scope.autoChanges){
            switch($scope.article){
                case "1":
                    $scope.article = "2";
                    break;
                case "2":
                    $scope.article = "3";
                    break;
                case "3":
                    $scope.article = "4";
                    break;
                case "5":
                    $scope.article = "5";
                    break;
                default:
                    $scope.article = "1";
            }
        }
        $timeout(doSomething, 2500 + getRandomInt(1000) + TryParseInt($scope.time, 2000));
    }

    $timeout(doSomething, 2500 + getRandomInt(1000) + TryParseInt($scope.time, 2000));

    $scope.topBoxMovies = [];

    $http.get(baseURL + '/movies/top-box')
        .then(function (data) {
            console.log(data);
            $scope.topBoxMovies = data.data;
            $scope.topBoxMovies.forEach(function (movie) {
                movie.poster = movie.poster.replace("snippets",baseURL);
            })
        });

}]);

App.controller('instantSearchCtrl',['$scope','$http',function($scope, $http){

    $scope.searchMovie = function () {
        if(!$scope.searchString) {
            $scope.movies = [];
            $scope.actors = [];
        }
        $http.get(baseURL + '/search-movies/?query=' + $scope.searchString)
            .then(function (data) {
                console.log(data);
                $scope.movies = data.data;
            });
    };

    $scope.searchActor= function () {
        if(!$scope.searchString) {
            $scope.movies = [];
            $scope.actors = [];
        }
        $http.get(baseURL + '/search-actors/?query=' + $scope.searchString)
            .then(function (data) {
                console.log(data);
                $scope.actors = data.data;
            });
    };

    $scope.empty = function () {
        $scope.searchString = null;
        $scope.movies = [];
        $scope.actors = [];
    }
}]);

