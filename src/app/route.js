/* Setup Routing For All Pages */
(function () {
    'use strict';

    angular.module('SdpApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        // Redirect any unmatched url
        $urlRouterProvider.otherwise('/dashboard');

        $urlRouterProvider.when('/', '');
        $urlRouterProvider.when('', '/dashboard');

        $stateProvider

            .state('root', {
                url: '/',
                abstract: true,
                ncyBreadcrumb: {
                    label: '{{"Home"|translate}}'
                },
                templateUrl: 'app/layouts/app.html',
                redirectTo: 'root.app',
                resolve: {
                    deps: ['$ocLazyLoad', '$rootScope', function ($ocLazyLoad, $rootScope) {
                        if ($rootScope.lang === 'fa') {
                            return $ocLazyLoad.load({
                                name: 'SdpApp',
                                files: [
                                    'assets/lib/metronic/theme_rtl/assets/global/css/components-rtl.min.new.css',
                                    'assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css',
                                    'assets/lib/metronic/theme_rtl/assets/global/css/components-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/global/css/plugins-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/admin/layout/css/layout-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/admin/layout/css/themes/default-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/admin/layout/css/custom-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/cs/jquery.Bootstrap-PersianDateTimePicker.css',
                                    'assets/lib/metronic/theme_rtl/assets/global/plugins/dataTables.bootstrap-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/admin/pages/css/login3-rtl.css',
                                    'assets/lib/metronic/theme_rtl/assets/admin/pages/css/profile-rtl.css'
                                ]
                            });
                        } else if ($rootScope.lang === 'en') {
                            return $ocLazyLoad.load({
                                name: 'SdpApp',
                                files: [
                                    'assets/lib/metronic/theme/assets/global/css/components.min.css',
                                    'assets/lib/metronic/theme/assets/global/plugins/bootstrap/css/bootstrap.min.css',
                                    'assets/lib/metronic/theme/assets/global/css/components.css',
                                    'assets/lib/metronic/theme/assets/global/css/plugins.css',
                                    'assets/lib/metronic/theme/assets/admin/layout/css/layout.css',
                                    'assets/lib/metronic/theme/assets/admin/layout/css/themes/default.css',
                                    'assets/lib/metronic/theme/assets/admin/layout/css/custom.css',
                                    'assets/lib/metronic/theme/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                                    'assets/lib/metronic/theme/assets/admin/pages/css/login-3.css',
                                    'assets/lib/metronic/theme/assets/admin/pages/css/profile.css'
                                ]
                            });
                        }
                    }]
                }
            })

            .state('auth', {
                url: '/',
                abstract: true,
                ncyBreadcrumb: {
                    label: '{{"Authentication"|translate}}'
                },
                templateUrl: 'app/layouts/auth.html',
                redirectTo: 'root.app'
            })

            .state('root.app', {
                url: '',
                abstract: true,
                // resources: ['registry_get', 'event_count'],
                redirectTo: 'root.app.hermes',
                ncyBreadcrumb: {
                    label: '{{"Hermes"|translate}}'
                },
                views: {
                    'notification': {
                        templateUrl: 'app/layouts/header/notification/notification.html',
                        controller: 'NotificationController'
                    },
                    'userMenu': {
                        templateUrl: 'app/layouts/header/user-menu/user-menu.html',
                        controller: 'UserMenuController'
                    },
                    'sidebar': {
                        templateUrl: 'app/layouts/sidebar/sidebar.html',
                        controller: 'SidebarController'
                    },
                    'content': {
                        templateUrl: 'app/layouts/content/content.html'
                    },
                    'footer': {
                        templateUrl: 'app/layouts/footer/footer.html',
                        controller: 'FooterController'
                    }
                }
            });
    }]);
}());
