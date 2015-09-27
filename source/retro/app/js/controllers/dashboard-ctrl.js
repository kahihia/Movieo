/**
 * Created by sanjay on 3/28/15.
 */

App.controller('DashboardController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state, responseCode) {
    $scope.stats={};
    $scope.stats.rides = 0;
    $scope.stats.users = 0;
    $scope.stats.revenue = 0;
    console.log("inside controller");
    var now = new Date();
    var yesterday = now.setDate(now.getDate() - 1);
    $.post(MY_CONSTANT.url + '/dashboard_report', {
        access_token: $cookieStore.get('obj').accesstoken,
        start_time: yesterday,
        end_time: now
    }, function (response) {
        response = JSON.parse(response);
        if (response.status = responseCode.SUCCESS) {
            var data=response.data;
            console.log(data);
            $scope.stats.revenue = data.total_data.earnings;
            $scope.stats.rides = data.total_data.rides;
            $scope.stats.users = data.total_users;
            $scope.$apply();
        }
    })
});
