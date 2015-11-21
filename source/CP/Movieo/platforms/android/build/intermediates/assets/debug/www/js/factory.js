//var base = 'http://localhost:3000';
var base = 'http://umeshksingla.pythonanywhere.com';

angular.module('movieo.factory', [])

// Loader module takes care of loading shown when fetching data
// One module I hope never actually runs for too long
.factory('Loader', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {

    var LOADERAPI = {

        showLoading: function(text) {
            text = text || 'Loading...';
            $ionicLoading.show({
                template: text
            });
        },

        hideLoading: function() {
            $ionicLoading.hide();
        },

        toggleLoadingWithMessage: function(text, timeout) {
            var self = this;

            self.showLoading(text);

            $timeout(function() {
                self.hideLoading();
            }, timeout || 3000);
        }

    };
    return LOADERAPI;
}])

// Local Storage Factory to handle all cached data
.factory('LSFactory', [function() {

    var LSAPI = {

        clear: function() {
            return localStorage.clear();
        },

        get: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },

        set: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        },

        delete: function(key) {
            return localStorage.removeItem(key);
        },

        getAll: function() {
            var movies = [];
            var items = Object.keys(localStorage);

            for (var i = 0; i < items.length; i++) {
                if (items[i] !== 'user' || items[i] != 'token') {
                    movies.push(JSON.parse(localStorage[items[i]]));
                }
            }

            return movies;
        }

    };

    return LSAPI;

}])

// To handle user authentication once we introduce it 
.factory('AuthFactory', ['LSFactory', function(LSFactory) {

    var userKey = 'user';
    var tokenKey = 'token';

    var AuthAPI = {

        isLoggedIn: function() {
            return this.getUser() === null ? false : true;
        },

        getUser: function() {
            return LSFactory.get(userKey);
        },

        setUser: function(user) {
            return LSFactory.set(userKey, user);
        },

        getToken: function() {
            return LSFactory.get(tokenKey);
        },

        setToken: function(token) {
            return LSFactory.set(tokenKey, token);
        },

        deleteAuth: function() {
            LSFactory.delete(userKey);
            LSFactory.delete(tokenKey);
        }

    };

    return AuthAPI;

}])

.factory('MoviesFactory', ['$http', function($http) {
    var topTen = {
        get: function() {
            return $http.get(base + '/movies/top-ten');
        }
    };
    return topTen;
}])

.factory('MovieIndividual', ['$http', function($http){
    var movieData = {
        get: function(movieId) {
            return $http.get(base + '/movies/' + movieId )
        }
    };
    return movieData;
}])