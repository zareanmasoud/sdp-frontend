(function () {
    'use strict';

    angular.module('SdpApp').factory('developerService', ['baseService', function (baseService) {

        var developerService = function () {
            baseService.call(this, 'hermes/v1', 'developers');
        };

        developerService.prototype = new baseService();

        return developerService;

    }]);
}());
