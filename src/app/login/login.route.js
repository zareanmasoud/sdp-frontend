(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

        // Login
            .state('auth.login', {
                url: 'login',
                ncyBreadcrumb: {
                    label: '{{"Login"|translate}}'
                },
                data: {
                    pageTitle: 'Login',
                    requireLogin: false
                },
                views: {
                    'content': {
                        templateUrl: 'app/login/login.template.html',
                        controller: 'LoginController'
                    }
                }
            });

    }]);

}());
