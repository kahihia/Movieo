/*
    created by umeshksingla on sep 27,2015
 */
// Application Routes

var myApp = angular.module('myAppName', ['movieo']);
myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        'use strict';

        $locationProvider.html5Mode(false);

        // default route
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider

            .state('dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                templateUrl: helper.basepath('dashboard.html')
            });



    }]);
