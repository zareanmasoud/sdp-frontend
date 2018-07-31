(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Dashboard
            .state('root.app.dashboard', {
                url: 'dashboard',
                ncyBreadcrumb: {
                    label: '{{"Dashboard"|translate}}'
                },
                data: {
                    pageTitle: 'Dashboard',
                    requireLogin: true
                },
                views: {
                    'content@root.app': {
                        templateUrl: 'app/dashboard/dashboard.template.html',
                        controller: 'DashboardController'
                    }
                }
            });

    }]);

}());
