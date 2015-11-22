angular.module('movieo', ['ionic', 'movieo.controllers','movieo.factory','openfb','chart.js'])

.run(function($rootScope, $state, $ionicPlatform, $window, OpenFB) {
  
  // Redirect URL : https://www.facebook.com/connect/login_success.html When deploying to android
  OpenFB.init('1652935351632817');
          
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })

  .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
   .state('app.fblogin', {
      url: '/fblogin',
      views: {
        'menuContent': {
          templateUrl: 'templates/fblogin.html',
          controller: 'LoginCtrl'
        }
      }
    })
    
    .state('app.trending', {
      url: '/trending',
      views: {
        'menuContent': {
          templateUrl: 'templates/trending.html',
          controller: 'BrowseCtrl'
        }
      }
    })
    
    .state('app.upcoming', {
      url: '/upcoming',
      views: {
        'menuContent': {
          templateUrl: 'templates/upcoming.html'
        }
      }
    })
    
    .state('app.topbox', {
      url: '/topbox',
      views: {
        'menuContent': {
          templateUrl: 'templates/topbox.html',
          controller: 'topBoxCtrl'
        }
      }
    })
    
    .state('app.movie',{
      url: "/movie/:movieId",
      views:{
        'menuContent': {
          templateUrl: 'templates/movie.html',
          controller: 'movieCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.logout', {
      url: "/logout",
      views: {
          'menuContent': {
              templateUrl: "templates/logout.html",
              controller: "LogoutCtrl"
          }
      }
  })
  
  .state('app.profile', {
      url: "/profile",
      views: {
          'menuContent': {
              templateUrl: "templates/profile.html",
              controller: "ProfileCtrl"
          }
      }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
});