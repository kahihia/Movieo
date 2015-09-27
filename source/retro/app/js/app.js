// if not jquery
if (typeof $ === 'undefined') {
    throw new Error('This application\'s JavaScript requires jQuery');
}


// APP START
// ----------------------------------- 

var App = angular.module('movieo', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'ngSanitize', 'ngResource', 'ui.utils'])
    .run(["$rootScope", "$state", "$stateParams", '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
         if (typeof(toState) !== 'undefined'){
         $templateCache.remove(toState.templateUrl);
         }
         });*/
        console.log("log from movieo app");
        // Scope Globals
        // -----------------------------------
        $rootScope.app = {
            name: 'Movieo',
            description: 'Movieo - A Social Community for Movie Lovers',
            year: ((new Date()).getFullYear())
        };
        $rootScope.user = {
            name: 'Umesh',
            job: 'ng-Dev'
        };

    }]);




/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
    .constant('APP_REQUIRES', {
        // jQuery based and standalone scripts
        scripts: {
            'modernizr': ['vendor/modernizr/modernizr.js'],
            'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                'vendor/simple-line-icons/css/simple-line-icons.css'],
            'parsley': ['vendor/parsleyjs/dist/parsley.min.js'],
            'datatables': ['vendor/datatables/media/js/jquery.dataTables.min.js',
                'vendor/datatable-bootstrap/css/dataTables.bootstrap.css'],
            'datatables-pugins': ['vendor/datatable-bootstrap/js/dataTables.bootstrap.js',
                'vendor/datatable-bootstrap/js/dataTables.bootstrapPagination.js',
                'vendor/datatables-colvis/js/dataTables.colVis.js',
                'vendor/datatables-colvis/css/dataTables.colVis.css'],
            'flot-chart':         ['vendor/Flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                'vendor/Flot/jquery.flot.resize.js',
                'vendor/Flot/jquery.flot.pie.js',
                'vendor/Flot/jquery.flot.time.js',
                'vendor/Flot/jquery.flot.categories.js',
                'vendor/flot-spline/js/jquery.flot.spline.min.js']
        },
        // Angular based script (use the right module name)
        modules: [
            {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                'vendor/ngDialog/css/ngDialog.min.css',
                'vendor/ngDialog/css/ngDialog-theme-default.min.css'] }
        ]

    });

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
    "use strict";

    // Set here the base of the relative path
    // for all app views
    this.basepath = function (uri) {
        return 'app/views/' + uri;
    };

    // Generates a resolve object by passing script names previously configured in constant.APP_REQUIRES
    this.resolveFor = function () {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                // Creates a promise chain for each argument
                var promise = $q.when(1); // empty promise
                for (var i = 0, len = _args.length; i < len; i++) {
                    promise = andThen(_args[i]);
                }
                return promise;

                // creates promise to chain dynamically
                function andThen(_arg) {
                    // also support a function that returns a promise
                    if (typeof _arg == 'function')
                        return promise.then(_arg);
                    else
                        return promise.then(function () {
                            // if is a module, pass the name. If not, pass the array
                            var whatToLoad = getRequired(_arg);
                            // simple error check
                            if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            // finally, return a promise
                            return $ocLL.load(whatToLoad);
                        });
                }

                // check and returns required data
                // analyze module items with the form [name: '', files: []]
                // and also simple array of script files (for not angular js)
                function getRequired(name) {
                    if (appRequires.modules)
                        for (var m in appRequires.modules)
                            if (appRequires.modules[m].name && appRequires.modules[m].name === name)
                                return appRequires.modules[m];
                    return appRequires.scripts && appRequires.scripts[name];
                }

            }]
        };
    }; // resolveFor

    // not necessary, only used in config block for routes
    this.$get = function () {
    };

}]);

/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
    ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', "$cookieStore",
        function ($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, $cookieStore) {
            'use strict';


        }]);


/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

App.directive('validateForm', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            if($.fn.parsley)
                $elem.parsley();
        }
    };
});
