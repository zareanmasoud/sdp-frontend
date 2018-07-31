(function () {
    'use strict';

    angular.module('SdpApp').filter('map', ['uiGridFactory', function (uiGridFactory) {
        return uiGridFactory.getMapFilter();
    }]);

    angular.module('SdpApp').filter('maps', ['uiGridFactory', function (uiGridFactory) {
        return uiGridFactory.getMapFilters();
    }]);
}());
