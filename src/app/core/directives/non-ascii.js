(function () {
    'use strict';

    angular.module('SdpApp').directive('nonAscii', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                scope.nonAsciiPattern = /[^\x00-\x7F]/;

                function checkForNonAscii(viewValue) {
                    if (scope.nonAsciiPattern.test(viewValue)) {
                        ctrl.$setValidity('nonAscii', false);
                    }
                    else {
                        ctrl.$setValidity('nonAscii', true);
                    }
                    return viewValue;
                }
                ctrl.$parsers.unshift(checkForNonAscii);
                ctrl.$formatters.unshift(checkForNonAscii);
            }
        };
    });
}());
