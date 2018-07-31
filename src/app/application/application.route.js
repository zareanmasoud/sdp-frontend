(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

        // generic application
            .state('root.app.application', {
                url: 'hermes',
                ncyBreadcrumb: {
                    label: '{{"Application"|translate}}'
                },
                abstract: true
            });
    }]);
}());
