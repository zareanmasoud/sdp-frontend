(function () {
    'use strict';

    angular.module('SdpApp').factory('authInterceptorService', ['$q', 'localStorageService', '$location', '$injector', '$log', 'debug',
        function ($q, localStorageService, $location, $injector, $log, debug) {

            var authInterceptorServiceFactory = {};

            // add token to the header of the request
            var _request = function (config) {

                config.headers = config.headers || {};
                // var authService = $injector.get('authService');
                // var authData = authService.authentication;
                // if (authData && config.url.indexOf(':8086') === -1) {
                //     config.headers.token = authData.token;
                // }
                return config;
            };

            // catch response with error
            var _responseError = function (rejection) {
                if (debug) {
                    $log.debug(rejection);
                }
                var deferred = $q.defer();
                // var authService = $injector.get('authService');

                // var state = $injector.get('$state');

                var gettextCatalog = $injector.get('gettextCatalog');
                var toastr = $injector.get('toastr');

                if (rejection.status === 403) {
                    // var notificationService = $injector.get('notificationService');
                    Metronic.unblockUI('.portlet-body');
                    // notificationService.logout();

                    // authService.logOut();

                    // // setting URL(stateName) for surfing later if user needs it after login when user's token expired
                    // authService.setBackURL(state.current.name);

                    // $location.url('/login');
                    // toastr.error(gettextCatalog.getString('Access token has been expired.'), gettextCatalog.getString('Notification'));
                    deferred.reject(rejection);
                }
                else if (rejection.status === 400) {
                    Object.keys(rejection.data).forEach(function (key) {
                        toastr.error('Code = ' + rejection.status + ' ' + rejection.data[key], gettextCatalog.getString('Notification'));
                    });
                    deferred.reject(rejection);
                }
                else if (rejection.status === 404) {
                    toastr.error(gettextCatalog.getString('No Route :') + ' ' + rejection.config.url, gettextCatalog.getString('Notification'));
                    deferred.reject(rejection);
                }
                else if (rejection.status === 401) {
                    toastr.error(gettextCatalog.getString('No Access To :') + ' ' + rejection.config.url, gettextCatalog.getString('Notification'));
                    deferred.reject(rejection);
                }
                else if (rejection.status === 503) {
                    toastr.warning(gettextCatalog.getString('Index needs refresh : ') + ' ' + rejection.config.url, gettextCatalog.getString('Notification'));
                    deferred.reject(rejection);
                }
                else if (rejection.status) {
                    toastr.error(gettextCatalog.getString('Unknown Error, Code =') + rejection.status, gettextCatalog.getString('Notification'));
                    deferred.reject(rejection);
                }
                else {
                    deferred.reject(rejection);
                }
                return deferred.promise;
            };

            // function sleep(milliseconds) {
            //     var start = new Date().getTime();
            //     for (var i = 0; i < 1e7; i++) {
            //         if ((new Date().getTime() - start) > milliseconds){
            //             break;
            //         }
            //     }
            // }

            // catch response with no error
            var _response = function (response) {
                //
                // if (!test && (response.config.method === 'POST' || response.config.method === 'PUT' || response.config.method === 'DELETE')) {
                //     sleep(3000);
                // }
                //
                if (debug && typeof response.data !== 'string') {
                    $log.debug(response);
                }

                return response;

            };
            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;
            authInterceptorServiceFactory.response = _response;


            return authInterceptorServiceFactory;
        }]);
}());
