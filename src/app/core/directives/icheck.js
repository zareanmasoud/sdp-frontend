(function () {
    'use strict';

    angular.module('SdpApp').directive('icheck', ['$timeout', '$parse', function ($timeout) {
        return {
            require: 'ngModel',
            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    var value, cssClass;
                    value = $attrs.value;
                    cssClass = $attrs.css;

                    $scope.$watch($attrs.ngModel, function () {
                        $(element).iCheck('update');
                    });

                    return $(element).iCheck({
                        checkboxClass: cssClass,
                        radioClass: cssClass

                    }).on('ifChanged', function (event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
                            $scope.$apply(function () {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs.ngModel) {
                            return $scope.$apply(function () {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    }]);
}());
