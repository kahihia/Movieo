// To run this code, edit file
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// -----------------------------------

var myApp = angular.module('myAppName', ['angle','uiGmapgoogle-maps']);

myApp.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
//    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
}]);
myApp.run(["$log", function ($log) {

    $log.log('I\'m a line from custom.js');

}]);

App.constant("MY_CONSTANT", {
    "url": "http://ridr.clicklabs.in:8990"
});

App.constant("responseCode", {
    "SUCCESS": 200
});
myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // default route
        $urlRouterProvider.otherwise('/app/dashboard');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            //
            // Single Page Routes
            // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('modernizr', 'icons', 'parsley'),
                controller: ["$rootScope", function ($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.login', {
                url: '/login',
                title: "Login",
                templateUrl: 'app/pages/login.html'
            })
            .state('page.register', {
                url: '/register',
                title: "Register",
                templateUrl: 'app/pages/register.html'
            })
            .state('page.recover', {
                url: '/recover',
                title: "Recover",
                templateUrl: 'app/pages/recover.html'
            })
            .state('page.terms', {
                url: '/terms',
                title: "Terms & Conditions",
                templateUrl: 'app/pages/terms.html'
            })
            .state('page.404', {
                url: '/404',
                title: "Not Found",
                templateUrl: 'app/pages/404.html'
            })

            //App routes

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath( 'app-h.html' ),
                resolve: helper.resolveFor('modernizr', 'icons', 'screenfull', 'classyloader', 'slimscroll')
            })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                controller: ["$rootScope", "$scope", function($rootScope, $scope) {
                    $rootScope.app.layout.horizontal = true;
                    $scope.$on('$destroy', function(){
                        $rootScope.app.layout.horizontal = false;
                    });
                }],
                templateUrl: helper.basepath('dashboard.html'),
                resolve: helper.resolveFor('angular-carousel')
            })
            .state('app.movies', {
                url: '/movies/{movie_id}',
                title: 'Movie',
                templateUrl: helper.basepath('movie.html'),
                resolve: helper.resolveFor('classyloader', 'slimscroll')
            })
            .state('app.actors', {
                url: '/actors/{actor_id}',
                title: 'Actor ',
                templateUrl: helper.basepath('actor.html')
            })
            .state('app.review-analysis', {
                url: '/review-analysis/{review_id}',
                title: 'Review Analysis',
                templateUrl: helper.basepath('review-analysis.html'),
                resolve: helper.resolveFor('classyloader')
            })
    }]);

App.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();

        angular.forEach(arr, function(item){
            if(item.name.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});

App.filter('space', function () {

    return function (value) {
        console.log(value);
        return (!value) ? '' : value.replace(/,/g, ' ');
    };
});

App.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});

App.directive('classyloader', ["$timeout", "Utils", function($timeout, Utils) {
    'use strict';

    var $scroller       = $(window),
        inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // run after interpolation
            $timeout(function(){

                var $element = $(element),
                    options  = $element.data();

                // At lease we need a data-percentage attribute
                if(options) {
                    if( options.triggerInView ) {

                        $scroller.scroll(function() {
                            checkLoaderInVIew($element, options);
                        });
                        // if the element starts already in view
                        checkLoaderInVIew($element, options);
                    }
                    else
                        startLoader($element, options);
                }

            }, 0);

            function checkLoaderInVIew(element, options) {
                var offset = -20;
                if( ! element.hasClass(inViewFlagClass) &&
                    Utils.isInView(element, {topoffset: offset}) ) {
                    startLoader(element, options);
                }
            }
            function startLoader(element, options) {
                element.ClassyLoader(options).addClass(inViewFlagClass);
            }
        }
    };
}]);

App.directive('scrollable', function(){
    return {
        restrict: 'EA',
        link: function(scope, elem, attrs) {
            var defaultHeight = 250;
            elem.slimScroll({
                height: (attrs.height || defaultHeight)
            });
        }
    };
});