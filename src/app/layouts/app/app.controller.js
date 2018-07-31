(function () {
    'use strict';

    angular.module('SdpApp').controller('AppController', ['$scope', '$rootScope', 'gettextCatalog', function ($scope, $rootScope, gettextCatalog) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            Metronic.initAjax();
        });

        $scope.gettextCatalog = function (text) {
            return gettextCatalog.getString(text);
        };

        // $rootScope.isAuth = authService.isAuth;
    }]);
}());
