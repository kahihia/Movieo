/**
 * Created by umeshksingla on 11/16/15.
 */

App.controller('DashboardController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state, responseCode) {
    $scope.Guest = !checkCookie();
});

App.controller('AngularCarouselController', ["$scope", function($scope) {

    $scope.Guest = !checkCookie();
    $scope.colors = ["#fc0003", "#f70008", "#f2000d", "#ed0012", "#e80017", "#e3001c", "#de0021", "#d90026", "#d4002b", "#cf0030", "#c90036", "#c4003b", "#bf0040", "#ba0045", "#b5004a", "#b0004f", "#ab0054", "#a60059", "#a1005e", "#9c0063", "#960069", "#91006e", "#8c0073", "#870078", "#82007d", "#7d0082", "#780087", "#73008c", "#6e0091", "#690096", "#63009c", "#5e00a1", "#5900a6", "#5400ab", "#4f00b0", "#4a00b5", "#4500ba", "#4000bf", "#3b00c4", "#3600c9", "#3000cf", "#2b00d4", "#2600d9", "#2100de", "#1c00e3", "#1700e8", "#1200ed", "#0d00f2", "#0800f7", "#0300fc"];

    function getSlide(target, style) {
        var i = target.length;
        return {
            id: (i + 1),
            label: 'slide #' + (i + 1),
            img: 'http://lorempixel.com/1200/500/' + style + '/' + ((i + 1) % 10) ,
            color: $scope.colors[ (i*10) % $scope.colors.length],
            odd: (i % 2 === 0)
        };
    }

    function addSlide(target, style) {
        target.push(getSlide(target, style));
    }

    $scope.carouselIndex3 = 5;

    function addSlides(target, style, qty) {
        for (var i=0; i < qty; i++) {
            addSlide(target, style);
        }
    }
    //$scope.slides3 = [];
    $scope.slides3 = ['https://www.nationalgalleries.org/media/41/batman.jpg',
        'http://static.rogerebert.com/uploads/review/primary_image/reviews/toy-story-3-2010/hero_EB20100616REVIEWS100619990AR.jpg',
        'http://images-cdn.moviepilot.com/image/upload/c_fill,h_500,w_1200/t_mp_quality/uploads_f74e8e10-807a-439a-9f6f-5cc52a932f2f-hero_conjuring-2013-1-jpg-18497.jpg',
    'http://static6.businessinsider.com/image/53ac579d6bb3f71e1f2ad27a-1200-500/transformers-age-of-extinction-autobots.jpg',
    'http://static.rogerebert.com/uploads/review/primary_image/reviews/iron-man-3-2013/hero_iron-man-3-couch.jpg'];

    //addSlides($scope.slides3, 'people', 50);

}]);

App.controller('SearchController',['$scope','$http',function($scope, $http){

    $scope.Guest = !checkCookie();
    $scope.searchString = '';

    $scope.search = function(){
        console.log($scope.searchString);
    };

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
        $scope.searchString = '';
        $scope.movies = [];
        $scope.actors = [];
    };

    $(document).click(function() {
        $scope.empty();
        console.log("emptying");
    });

}]);
