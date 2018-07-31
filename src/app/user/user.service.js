(function () {
    'use strict';

    angular.module('SdpApp').factory('userService',['gettextCatalog', function (gettextCatalog) {

        var userService = function () {

        };

        var languages = [
            {
                name: 'fa',
                description: gettextCatalog.getString('Fa')
            },
            {
                name: 'en',
                description: gettextCatalog.getString('En')
            }
        ];

        userService.prototype.getLanguages = function () {
            return languages;
        };

        return userService;
    }]);
}());
