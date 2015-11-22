/**
 * Created by sanjay on 3/25/15.
 */
App.controller('LoginController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state) {

    $scope.account = {};
    $scope.authMsg = '';

    var someSessionObj = {'accesstoken': 'umeshkumarsingla'};
    $cookieStore.put('obj', someSessionObj);
    $state.go('app.dashboard');

});

