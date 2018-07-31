(function () {
    'use strict';

    angular.module('SdpApp').filter('reverse', [function () {
        return function (items) {
            return items.slice().reverse();
        };
    }]);
}());
