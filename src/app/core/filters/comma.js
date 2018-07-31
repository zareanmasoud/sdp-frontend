(function () {
    'use strict';

    angular.module('SdpApp').filter('comma', [function () {
        return function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،');
        };
    }]);
}());
