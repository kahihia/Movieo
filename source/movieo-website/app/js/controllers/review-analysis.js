/**
 * Created by umeshksingla on 22/11/15.
 */
App.controller('reviewAnalysisController',['$scope','$timeout','$http','$rootScope', '$stateParams', '$interval',function ($scope, $timeout, $http, $rootScope, $stateParams, $interval) {
    'use strict';

    console.log($stateParams.review_id);
    $scope.data = {};
    function loadanalysis(){

        $http.post(baseURL + '/keyword_analysis', {
            review_id: $stateParams.review_id
        }).success(function (response) {
            $scope.data= response.analysis;
            $scope.text= response.text;
            console.log(response);
        }).error(function (error) {
            $scope.error= error;
            console.log(error);
        })
    }

    loadanalysis();
}]);