angular.module('movieo.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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
                var newStr = tempStr.replace("mysite/snippets","http://umeshksingla.pythonanywhere.com")
                movies[i].poster = newStr
                LSFactory.set(movies[i].id, movies[i]);
            };
        }

    }
])

.controller('movieCtrl',['$scope', '$state', 'MovieIndividual', '$rootScope', 'Loader',
        function($scope, $state, MovieIndividual, $rootScope, Loader) {
          
          // movieId hold the ID of the current movie being referred to
          var movieId = $state.params.movieId;
          
          MovieIndividual.get(movieId).success(function(data){
            $scope.movie = data[0];
            
            var tempStr = $scope.movie.poster
            var newStr = tempStr.replace("mysite/snippets","http://umeshksingla.pythonanywhere.com")
            $scope.movie.poster = newStr
            
            $scope.$broadcast('scroll.infiniteScrollComplete');
            Loader.hideLoading();
          }).error(function(err, statusCode) {
            Loader.hideLoading();
            Loader.toggleLoadingWithMessage(err.message);
          })
}])