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
                default:
                    $scope.article = "1";
            }
        }
        $timeout(doSomething, 1800 + getRandomInt(1000) + TryParseInt($scope.time, 1000));
    }

    $timeout(doSomething, 1800 + getRandomInt(1000) + TryParseInt($scope.time, 1000));

    $http.post('http://127.0.0.1:8000/snippets/', {
        "code":"a = umesh"
    })
        .success(function(response){
            console.log(response);
        })
        .error(function(err){
            console.log(err);
        });

    $http.get('http://127.0.0.1:8000/snippets/3')
        .success(function(response){
            console.log(response);
        })
        .error(function(err){
            console.log(err);
        })
}]);
