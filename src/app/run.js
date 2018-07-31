/* Init global settings and run the app */
(function () {
    'use strict';

    angular.module('SdpApp').run(['$rootScope', '$cookies', 'settings', '$state', 'i18nService', 'gettextCatalog', 'authService', 'localStorageService',
        function ($rootScope, $cookies, settings, $state, i18nService, gettextCatalog, authService, localStorageService) {
        var langCookie = $cookies.get('lang');
            var lang = typeof langCookie !== 'undefined' ? langCookie : 'fa';
            $rootScope.lang = lang;

            $rootScope.getAlignment = function () {
                if ($rootScope.lang === 'en') {
                    $rootScope.alignment = 'left';
                } else {
                    $rootScope.alignment = 'right';
                }
                return $rootScope.alignment;
            };

            gettextCatalog.setCurrentLanguage(lang);
            i18nService.setCurrentLang(lang);

            gettextCatalog.debug = true;

            $rootScope.dropEnabled = true;
            $rootScope.$state = $state; // state to be accessed from view

            authService.fillPanelAuthorizationData();

            // authService.fillAuthData();
            //
            // if (authService.isAuth()) {
            //     // notificationService.login();
            // }

            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
                $rootScope.previousState = from.name;
                $rootScope.currentState = to.name;
            });

            $rootScope.goToPreviousState = function () {
                $state.go($rootScope.previousState);
            };

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var panelAuthorizationData = localStorageService.get('panelAuthorizationData');
                if (!panelAuthorizationData) {
                    authService.setCredentials('panel', 'panel');
                    authService.panelLogin();
                }

                // var isLoginState = toState.name === 'auth.login';
                // var isDashboardState = toState.name === 'root.app.dashboard';
                // var isAuth = authService.isAuth();

                var redirect = toState.redirectTo;

                if (redirect) {
                    event.preventDefault();
                    if (angular.isFunction(redirect)) {
                        redirect.call($state);
                    }
                    else {
                        $state.go(redirect);
                    }
                    return;
                }

                // if (isAuth) {
                //     if (isLoginState) {
                //         event.preventDefault(); // stop current execution
                //         $state.go('root.app.dashboard'); // go to dashboard
                //         $state.reload();
                //     } else {
                //
                //         if (!aclService.hasAccess(toState.name)) {
                //             event.preventDefault();
                //             // notificationService.logout();
                //             authService.logOut();
                //             // $state.go('auth.login'); // go to login
                //             $state.reload();
                //         }
                //     }
                // } else {
                //     if (!isLoginState) {
                //
                //         // setting URL(stateName) for surfing later if user needs it after login when user logged out
                //         authService.setBackURL(toState.name);
                //
                //         event.preventDefault(); // stop current execution
                //         $state.go('auth.login'); // go to login
                //     }
                // }
            });

        }]);
}());
