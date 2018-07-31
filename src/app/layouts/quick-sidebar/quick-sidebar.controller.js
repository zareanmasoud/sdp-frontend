/* Setup Layout Part - Quick Sidebar */
(function () {
    'use strict';

    angular.module('SdpApp').controller('QuickSidebarController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            setTimeout(function () {
                QuickSidebar.init(); // init quick sidebar
            }, 2000);
        });
    }]);
}());
