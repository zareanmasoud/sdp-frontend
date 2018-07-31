(function () {
    'use strict';

    angular.module('SdpApp').directive('cardTags', [function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            templateUrl: 'core/directives/cardTags/cardTags.html',
            scope: {
                tags: '=ngModel'
            }
        };
    }]);
}());
