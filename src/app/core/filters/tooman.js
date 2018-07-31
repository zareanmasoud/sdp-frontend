(function () {
    'use strict';

    angular.module('SdpApp').filter('tooman', [function () {
        return function (number) {
            return wordifyRialsInTomans(number, 0);
        };
    }]);
}());
