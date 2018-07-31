(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            .state('root.app.validation', {
                url: 'validation',
                ncyBreadcrumb: {
                    label: 'Validation'
                },
                resources: ['root'],
                data: {
                    pageTitle: 'Validation',
                    requireLogin: true
                },
                views: {
                    'content': {
                        templateUrl: 'app/validation/validation.template.html'
                    }
                }
            });
    }]);

}());
