(function () {
    'use strict';

    angular.module('SdpApp').controller('languageProfileUserController', ['$rootScope', '$scope', '$cookies', '$window', 'userService',
        function ($rootScope, $scope, $cookies, $window, userService) {
            var user = new userService();

            $scope.languages = user.getLanguages();

            $scope.changeLanguage = function() {
                $cookies.put('lang', $scope.lang);
                $rootScope.lang = $scope.lang;

                $window.location.reload();
            };
        }]);

}());
