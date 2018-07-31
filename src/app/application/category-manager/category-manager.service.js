(function () {
    'use strict';

    angular.module('SdpApp').factory('categoryService', ['baseService', function (baseService) {

        var categoryService = function () {
            baseService.call(this, 'hermes/v1', 'categories');
        };

        categoryService.prototype = new baseService();

        categoryService.prototype.getPagedCategories = function (currentPage, itemsPerPage, element) {
            var self = this;
            var filter = {
                '_limit': itemsPerPage,
                '_page': currentPage
            };
            return self.get(element, filter);
        };

        return categoryService;

    }]);
}());
