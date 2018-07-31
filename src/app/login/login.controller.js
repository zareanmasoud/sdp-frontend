(function () {
    'use strict';

    //handle login
    angular.module('SdpApp').controller('LoginController', ['$scope', '$state', 'authService', 'gettextCatalog',
    function ($scope, $state, authService, gettextCatalog) {

        $scope.errShow = false;

        $scope.loginData = {
            username: '',
            password: '',
            remember_me: true
        };

        $scope.login = function () {

            authService.login($scope.loginData).then(
                function () {
                    // generalService.init();

                    // check to see if there was a URL that user wanted to go before logout or token expiration
                    var BackURL = authService.getBackURL();

                    if (BackURL) {
                        $state.go(BackURL);
                    } else {
                        $state.go('root.app.dashboard'); // go to dashboard
                    }
                },
                function (err) {
                    switch (err.status) {
                        case 400:
                            $scope.errMessage = gettextCatalog.getString('Invalid Username or password');
                            break;
                        case 500:
                            $scope.errMessage = gettextCatalog.getString('Internal Server Error');
                            break;
                        case 503:
                            $scope.errMessage = gettextCatalog.getString('Service Unavailable');
                            break;
                        default:
                            $scope.errMessage = gettextCatalog.getString('Unknown Error');
                    }
                    $scope.errShow = true;
                });

        };

        $scope.$watch('loginData', function () {
            $scope.errShow = false;
        }, true);

    }]);

}());
