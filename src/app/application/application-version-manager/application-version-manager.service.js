(function () {
    'use strict';

    angular.module('SdpApp').factory('applicationVersionService', ['baseService', function (baseService) {

        var applicationVersionService = function () {
            baseService.call(this, 'hermes', 'versions', 'applications');
            this.versionUserService = new baseService('version-user');
        };

        applicationVersionService.prototype = new baseService();

        applicationVersionService.prototype.getPagedApplicationVersionsByApplicationId = function (packageName, currentPage, itemsPerPage, element) {
            var self = this;
            var filter = {
                '_limit': 1000,
                '_page': 1
                // '_embed': 'application'
            };
            return self.get(element, filter, packageName);
        };

        applicationVersionService.prototype.postUrl = function (url, element) {
            var self = this;
            return self.new(url, element);
        };


        return applicationVersionService;

    }]);
}());
