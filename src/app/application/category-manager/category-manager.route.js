(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

        // list categories
            .state('root.app.application.categories', {
                url: '/categories',
                ncyBreadcrumb: {
                    label: '{{"Categories List"|translate}}'
                },
                // resources: ['application_list'],
                data: {
                    pageTitle: 'Categories List',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/category-manager/list-categories/list-categories.template.html',
                        controller: 'ListCategoriesController'
                    }
                }
            })

            // new category
            .state('root.app.application.categories.newCategory', {
                url: '/new',
                ncyBreadcrumb: {
                    label: '{{"New Category"|translate}}'
                },
                // resources: ['category_add'],
                data: {
                    pageTitle: 'New Category',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/category-manager/new-category/new-category.template.html',
                        controller: 'NewCategoryController'
                    }
                }
            })

            // edit category
            .state('root.app.application.categories.editCategory', {
                url: '/:id/edit',
                ncyBreadcrumb: {
                    label: '{{"Edit Category"|translate}}'
                },
                // resources: ['category_add'],
                data: {
                    pageTitle: 'Edit Category',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/category-manager/edit-category/edit-category.template.html',
                        controller: 'EditCategoryController'
                    }
                }
            });
    }]);
}());
