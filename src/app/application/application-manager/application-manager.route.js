(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

        // list applications
            .state('root.app.application.applications', {
                url: '/applications',
                ncyBreadcrumb: {
                    label: '{{"Applications List"|translate}}'
                },
                // resources: ['application_list'],
                data: {
                    pageTitle: 'Applications List',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-manager/list-applications/list-applications.template.html',
                        controller: 'ListApplicationsController'
                    }
                }
            })

            // new application
            .state('root.app.application.applications.newApplication', {
                url: '/new',
                ncyBreadcrumb: {
                    label: '{{"New Application"|translate}}'
                },
                // resources: ['application_add'],
                data: {
                    pageTitle: 'New Application',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-manager/new-application/new-application.template.html',
                        controller: 'NewApplicationController'
                    }
                }
            })

            // edit application
            .state('root.app.application.applications.editApplication', {
                url: '/:package_name/edit',
                ncyBreadcrumb: {
                    label: '{{"Edit Application"|translate}}'
                },
                // resources: ['application_add'],
                data: {
                    pageTitle: 'Edit Application',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-manager/edit-application/edit-application.template.html',
                        controller: 'EditApplicationController'
                    }
                }
            })

            // // application's dashboard
            // .state('root.app.application.applications.dashboard', {
            //     url: '/:package_name/dashboard',
            //     ncyBreadcrumb: {
            //         label: '{{"Dashboard"|translate}}'
            //     },
            //     // resources: ['application_add'],
            //     data: {
            //         pageTitle: 'Dashboard',
            //         requireLogin: true
            //     },
            //     views: {
            //         'content@root.app': {
            //             templateUrl: 'app/application/application-manager/dashboard-application/dashboard-application.template.html',
            //             controller: 'DashboardApplicationController'
            //         }
            //     }
            // })

            // application's documents
            .state('root.app.application.applications.documents', {
                url: '/:package_name/documents',
                ncyBreadcrumb: {
                    label: '{{"Application Documents"|translate}}'
                },
                // resources: ['application_add'],
                data: {
                    pageTitle: 'Application Documents',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-manager/application-documents/application-documents.template.html',
                        controller: 'ApplicationDocumentsController'
                    }
                }
            });
    }]);
}());
