/*
    created by umeshksingla on sep 27,2015
 */
// Application Routes

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
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
            })
            .state('movies', {
                url: '/movies/{movie_id}',
                title: 'Movie',
                templateUrl: helper.basepath('movie.html')
            })
            .state('actors', {
                url: '/actors/{actor_id}',
                title: 'Actor',
                templateUrl: helper.basepath('actor.html')
            });



    }]);
