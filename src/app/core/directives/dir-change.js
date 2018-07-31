(function () {
    'use strict';

    angular.module('SdpApp').directive('dirChange',['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, elem, attrs) {
                attrs.$observe('dirChange', function() {
                    var lang = $rootScope.lang;
                    if(lang === 'en') {
                        elem.removeAttr('dir');
                    }
                });
            }
        };
    }]);
}());
