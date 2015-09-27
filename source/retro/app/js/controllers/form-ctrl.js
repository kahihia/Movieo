/**
 * Created by sanjay on 3/28/15.
 */
App.controller('FormController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state) {
    $scope.promo = {};
    $scope.addPromoCode = function () {
        $scope.successMsg = '';
        $scope.errorMsg = '';
        $scope.promo.access_token = $cookieStore.get('obj').accesstoken;
        //var access_token = {'access_token': $cookieStore.get('obj').accesstoken};
        $.post(MY_CONSTANT.url + '/addPromoCode', $scope.promo
        ).then(
            function (data) {
                data = JSON.parse(data);

                if (data.status == 200) {
                    $scope.successMsg = data.message.toString();
                    $scope.promo = {};
                } else {
                    $scope.errorMsg = data.message.toString();
                }
                $scope.$apply();
                scrollTo(0, 0);
            });
    };
});
