/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
(function () {
    'use strict';

    //AngularJS v1.3.x workaround for old style controller declaration in HTML
    angular.module('SdpApp').config(['$controllerProvider', function ($controllerProvider) {
        // this option might be handy for migrating old apps, but please don't use it
        // in new ones!
        $controllerProvider.allowGlobals();
        // set Highcharts default options
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
    }]);

    angular.module('SdpApp').config(['$tooltipProvider', function ($tooltipProvider) {
        $tooltipProvider.options({
            appendToBody: true
        });
    }]);

    angular.module('SdpApp').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }]);

    angular.module('SdpApp').config(['toastrConfig', function (toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            maxOpened: 1,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false
        });
    }]);

}());
