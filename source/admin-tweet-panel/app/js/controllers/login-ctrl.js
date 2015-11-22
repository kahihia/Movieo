/**
 * Created by umeshksingla on 3/25/15.
 */
App.controller('LoginController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state) {

    $scope.account = {};
    $scope.authMsg = '';

    $scope.loginAdmin = function () {
        $scope.authMsg = '';
        if($scope.account.email == 'admin' && $scope.account.password == 'umesh') {
            $scope.authMsg = '';
            var someSessionObj = {'accesstoken': 'ndhjf234bsj4kgkjh893yiy37g37'};
            $cookieStore.put('obj', someSessionObj);
            $state.go('app.dashboard');
        }
        else{
            $scope.authMsg = 'Wrong Credentials';
        }
    };

    $scope.recover = function () {

        $.post(MY_CONSTANT.url + '/forgot_password',
            {
                email: $scope.account.email
            }).then(
            function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (data.status == 200) {
                    $scope.successMsg = data.message.toString();
                } else {
                    $scope.errorMsg = data.message.toString();

                }
                $scope.$apply();
            })
    };

    $scope.logout = function () {
        $cookieStore.remove('obj');
        $state.go('page.login');
    }
});

