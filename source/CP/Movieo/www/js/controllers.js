var base = 'http://10.1.39.125:8000';

angular.module('movieo.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, OpenFB, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.logout = function () {
    OpenFB.logout();
    $state.go('app.login');
};

$scope.revokePermissions = function () {
    OpenFB.revokePermissions().then(
        function () {
            $state.go('app.login');
        },
        function () {
            alert('Revoke permissions failed');
        });
};

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Horror', id: 1 },
    { title: 'Action', id: 2 },
    { title: 'Thriller', id: 3 },
    { title: 'Comedy', id: 4 },
    { title: 'Documentary', id: 5 },
    { title: 'Sci-Fi', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('BrowseCtrl', ['$scope', 'MoviesFactory', 'LSFactory', 'Loader',
    function($scope, MoviesFactory, LSFactory, Loader) {

        Loader.showLoading();

        // support for pagination
        var page = 1;
        $scope.movies = [];
        var movies = LSFactory.getAll();

        // if movies exists in localStorage, use that instead of making a call
        if (movies.length > 0) {
            $scope.movies = movies;
            Loader.hideLoading();
        } else {
            MoviesFactory.get(page).success(function(data) {
                // process movies and store them 
                // in localStorage so we can work with them later on, 
                // when the user is offline
                processMovies(data);

                $scope.movies = data;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                Loader.hideLoading();
            }).error(function(err, statusCode) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage(err.message);
            });
        }

        function processMovies(movies) {
            LSFactory.clear();
            // we want to save each movie individually
            // this way we can access each movie info. by it's _id
            for (var i = 0; i < movies.length; i++) {
                var tempStr = movies[i].poster
                var newStr = tempStr.replace("snippets",base)
                movies[i].poster = newStr
                LSFactory.set(movies[i].id, movies[i]);
            };
        }

    }
])

.controller('upComingCtrl', ['$scope', 'MoviesFactory', 'LSFactory', 'Loader',
    function($scope, MoviesFactory, LSFactory, Loader) {

        Loader.showLoading();

        // support for pagination
        var page = 1;
        $scope.movies = [];
        var movies = LSFactory.getAll();

        // if movies exists in localStorage, use that instead of making a call
        if (movies.length > 0) {
            $scope.movies = movies;
            Loader.hideLoading();
        } else {
            upcomingFactory.get(page).success(function(data) {
                // process movies and store them 
                // in localStorage so we can work with them later on, 
                // when the user is offline
                processMovies(data);

                $scope.movies = data;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                Loader.hideLoading();
            }).error(function(err, statusCode) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage(err.message);
            });
        }

        function processMovies(movies) {
            LSFactory.clear();
            // we want to save each movie individually
            // this way we can access each movie info. by it's _id
            for (var i = 0; i < movies.length; i++) {
                LSFactory.set(movies[i].id, movies[i]);
            };
        }

    }
])

.controller('topBoxCtrl', ['$scope', 'MoviesFactory', 'LSFactory', 'Loader',
    function($scope, MoviesFactory, LSFactory, Loader) {

        Loader.showLoading();

        // support for pagination
        var page = 1;
        $scope.movies = [];
        var movies = LSFactory.getAll();

        // if movies exists in localStorage, use that instead of making a call
        if (movies.length > 0) {
            $scope.movies = movies;
            Loader.hideLoading();
        } else {
            topboxFactory.get(page).success(function(data) {
                // process movies and store them 
                // in localStorage so we can work with them later on, 
                // when the user is offline
                processMovies(data);

                $scope.movies = data;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                Loader.hideLoading();
            }).error(function(err, statusCode) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage(err.message);
            });
        }

        function processMovies(movies) {
            LSFactory.clear();
            // we want to save each movie individually
            // this way we can access each movie info. by it's _id
            for (var i = 0; i < movies.length; i++) {
                LSFactory.set(movies[i].id, movies[i]);
            };
        }

    }
])

.controller('movieCtrl',['$scope', '$state', 'MovieIndividual', '$rootScope', 'Loader','MovieCast','MovieReviews',
        function($scope, $state, MovieIndividual, $rootScope, Loader, MovieCast, MovieReviews) {
          
          // movieId hold the ID of the current movie being referred to
          var movieId = $state.params.movieId;
          
          MovieIndividual.get(movieId).success(function(data){
            $scope.movie = data[0];
            $scope.dir = data[1];
            
            
            var ratingChange = $scope.movie.rating
            $scope.movie.newRating = Math.round(ratingChange)
            
            var tempStr = $scope.movie.poster
            var newStr = tempStr.replace("snippets",base)
            $scope.movie.poster = newStr
            
            $scope.$broadcast('scroll.infiniteScrollComplete');
            Loader.hideLoading();
          }).error(function(err, statusCode) {
            Loader.hideLoading();
            Loader.toggleLoadingWithMessage(err.message);
          })
          
          MovieCast.get(movieId).success(function(data){
            $scope.cast = data;
            
            for (var i = 0; i < $scope.cast.length; i++) {
            
                var tempStr2 = $scope.cast[i].image_link
                var newStr2 = tempStr2.replace("snippets",base)
                $scope.cast[i].image_link = newStr2
            
            };
                       
          })
          
          $scope.totalPositive = 0;
          $scope.totalNegative = 0;
          var x = 0;
          
           MovieReviews.get(movieId).success(function(data){
               $scope.reviews = data;
               for (var i = 0; i < $scope.reviews.length; i++) {
                   
                   var tempPositivity = $scope.reviews[i].positivity;
                   $scope.reviews[i].positivity = (tempPositivity+100)/2;
                   $scope.totalPositive = $scope.totalPositive + $scope.reviews[i].positivity;
                   x = $scope.totalPositive;
                   $scope.totalNegative = $scope.totalNegative + 100;
               };
                $scope.totalNegative = $scope.totalNegative - $scope.totalPositive
                $scope.labels = ["None", "Neutral", "Negative","Positive"];
                $scope.data = [0, 0, $scope.totalNegative, x];
           })
           
           
           
          
}])          

.controller('actorCtrl',['$scope', '$state', 'MovieIndividual', '$rootScope', 'Loader','MovieCast','MovieReviews','actorFactory',
        function($scope, $state, MovieIndividual, $rootScope, Loader, MovieCast, MovieReviews, actorFactory) {
            
            // Store the ID of the actor whose data is to be retrieved
            var actorid = $state.params.actorid
            
            actorFactory.get(actorid).success(function(data){
                $scope.actorInfo = data;
            }).error(function(err, statusCode) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage(err.message);
          })
}])
            
            
            


.controller('LoginCtrl', function ($scope, $location, OpenFB) {

        $scope.facebookLogin = function () {

            OpenFB.login('email').then(
                function () {
                    $location.path('/app/person/me');
                },
                function () {
                    alert('OpenFB login failed');
                });
        };

})

.controller('ProfileCtrl', function ($scope, OpenFB) {
        OpenFB.get('/me').success(function (user) {
            $scope.user = user;
        });
})

.controller('PersonCtrl', function ($scope, $stateParams, OpenFB) {
        OpenFB.get('/' + $stateParams.personId).success(function (user) {
            $scope.user = user;
        });
})

.controller("DoughnutCtrl", function ($scope) {
  $scope.labels = ["Positive", "Neutral", "Negative","One more"];
  $scope.data = [0, 0, 100, 200];
});