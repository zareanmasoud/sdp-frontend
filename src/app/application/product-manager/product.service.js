(function () {
    'use strict';

    angular.module('SdpApp').factory('productService', ['baseService', 'gettextCatalog', function (baseService, gettextCatalog) {

        var productService = function () {
            baseService.call(this, 'hermes', 'products', 'applications');
        };

        productService.prototype = new baseService();

        productService.prototype.getProductTypes = function () {
            var self = this;
            return [
                {
                    title: gettextCatalog.getString('InApp'),
                    value: self.INAPP
                },
                {
                    title: gettextCatalog.getString('Subs'),
                    value: self.SUBS
                }
            ];
        };

        productService.prototype.INAPP = 0;
        productService.prototype.SUBS = 1;

        productService.prototype.getSubscriptionTypes = function () {
            var self = this;
            return [
                {
                    title: gettextCatalog.getString('PostPaid'),
                    value: self.POSTPAID
                },
                {
                    title: gettextCatalog.getString('PrePaid'),
                    value: self.PREPAID
                }
            ];
        };

        productService.prototype.POSTPAID = 0;
        productService.prototype.PREPAID = 1;

        productService.prototype.getPagedProductsByApplicationId = function (packageName, currentPage, itemsPerPage, element) {
            var self = this;
            var filter = {
                '_limit': itemsPerPage,
                '_page': currentPage
                // '_embed': 'application'
            };
            return self.get(element, filter, packageName);
        };
        return productService;

    }]);
}());
