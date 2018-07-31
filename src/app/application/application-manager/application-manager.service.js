(function () {
    'use strict';

    angular.module('SdpApp').factory('applicationService', ['baseService',  function (baseService) {

        var applicationService = function () {
            baseService.call(this, 'hermes/v1', 'applications');
        };

        applicationService.prototype = new baseService();

        applicationService.prototype.getPagedApplications = function (currentPage, itemsPerPage, element) {
            var self = this;
            var filter = {
                '_limit': itemsPerPage,
                '_page': currentPage
                // '_embed': 'category'
            };
            return self.get(element, filter);
        };

        return applicationService;

    }]);
}());
