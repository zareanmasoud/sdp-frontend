(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Profile User
            .state('root.app.profileUser', {
                url: 'profile',
                ncyBreadcrumb: {
                    label: '{{"User Profile"|translate}}'
                },
                abstract: true,
                views: {
                    'content@root.app': {
                        templateUrl: 'app/user/profile-user/profile-user.partial.html',
                        controller: 'ProfileUserController'
                    }
                }
            })

            // language
            .state('root.app.profileUser.language', {
                url: '/language',
                ncyBreadcrumb: {
                    label: '{{"User Profile"|translate}}'
                },
                data: {
                    pageTitle: 'User Profile',
                    requireLogin: true
                },
                views: {
                    'content@root.app.profileUser': {
                        templateUrl: 'app/user/profile-user/language/language.partial.html',
                        controller: 'languageProfileUserController'
                    }
                }
            });
    }]);

}());
