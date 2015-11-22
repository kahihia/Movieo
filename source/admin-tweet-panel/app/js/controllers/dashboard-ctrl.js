/**
 * Created by umeshksingla on 22/11/15.
 */

App.controller('DashboardController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state, responseCode) {

    $scope.movieList = [];
    $scope.tweetList = [];
    $scope.tweet = {};
    $scope.message = '';
    $scope.selected = {
        tweets : []
    };

    $http.get(baseUrl + '/movies/all')
        .then( function (response) {
            console.log(response);
            $scope.movieList = response.data;
        });

    $scope.sendHashtags = function () {
        console.log($scope.tweet);

        $scope.message = '';

        $http.post(baseUrl + '/get-tweets', {
            'hashtags' : $scope.tweet.hashtags
        })
            .then( function (response) {
                console.log(response);
                $scope.tweetList = response.data;

            }, function (error) {
                console.log(error);
                $scope.tweet = {};
                $scope.message = 'Could not fetch tweets';
            });
    };
    $scope.sendTweets = function () {
        $scope.message = '';
        console.log($scope.selected);
        if($scope.selected.tweets.length != 0) {
            $http.post(baseUrl + '/save-tweets', {
                'tweets': $scope.selected.tweets,
                'movie_id': $scope.tweet.movie_id
            })
                .then(function (response) {
                    $scope.message = '';
                    console.log(response);
                }, function (error) {
                    $scope.message = 'Error Occurred';
                    console.log(error);
                });
        }
        else {
            $scope.message = 'Please select one tweet';
        }
    }
});