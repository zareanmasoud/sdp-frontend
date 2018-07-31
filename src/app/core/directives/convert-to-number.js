(function () {
    'use strict';

    angular.module('SdpApp').directive('convertToNumber', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return val !== null ? parseInt(val, 10) : null;
                });
                ngModel.$formatters.push(function(val) {
                    return val !== null ? '' + val : null;
                });
            }
        };
    });
}());
