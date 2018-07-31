(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

        // list application versions
            .state('root.app.application.applications.applicationVersions', {
                url: '/:package_name/versions',
                ncyBreadcrumb: {
                    label: '{{"Application Versions List"|translate}}'
                },
                // resources: ['application-version_list'],
                data: {
                    pageTitle: 'Application Versions List',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-version-manager/list-application-versions/list-application-versions.template.html',
                        controller: 'ListApplicationVersionsController'
                    }
                }
            })

            // new application version
            .state('root.app.application.applications.applicationVersions.newApplicationVersion', {
                url: '/new',
                ncyBreadcrumb: {
                    label: '{{"New Application Version"|translate}}'
                },
                // resources: ['application-version_add'],
                data: {
                    pageTitle: 'New Application Version',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-version-manager/new-application-version/new-application-version.template.html',
                        controller: 'NewApplicationVersionController'
                    }
                }
            })

            // edit application version
            .state('root.app.application.applications.applicationVersions.editApplicationVersion', {
                url: '/:version_code/edit',
                ncyBreadcrumb: {
                    label: '{{"Edit Application Version"|translate}}'
                },
                // resources: ['application-version_add'],
                data: {
                    pageTitle: 'Edit Application Version',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/application/application-version-manager/edit-application-version/edit-application-version.template.html',
                        controller: 'EditApplicationVersionController'
                    }
                }
            });

    }]);
}());
