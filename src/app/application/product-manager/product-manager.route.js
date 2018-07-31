(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider
        // generic products
            .state('root.app.application.applications.products', {
                url: '/:package_name/products',
                // resources: ['product_list'],
                ncyBreadcrumb: {
                    label: '{{"Products List"|translate}}'
                },
                data: {
                    pageTitle: 'Products List',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/product-manager/list-products/list-products.template.html',
                        controller: 'ListProductsController'
                    }
                }
            })

            // new product
            .state('root.app.application.applications.products.newProduct', {
                url: '/new',
                // resources: ['product_add', 'charge-code_list'],
                ncyBreadcrumb: {
                    label: '{{"New Product"|translate}}'
                },
                data: {
                    pageTitle: 'New Product',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/product-manager/new-product/new-product.template.html',
                        controller: 'NewProductController'
                    }
                }
            })

            // edit product
            .state('root.app.application.applications.products.editProduct', {
                url: '/:sku/edit',
                // resources: ['product_add', 'product_get', 'charge-code_list' ],
                ncyBreadcrumb: {
                    label: '{{"Edit Product"|translate}}'
                },
                data: {
                    pageTitle: 'Edit Product',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/product-manager/edit-product/edit-product.template.html',
                        controller: 'EditProductController'
                    }
                }
            });

    }]);
}());
