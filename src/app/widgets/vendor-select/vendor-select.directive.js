(function () {
    'use strict';

    angular.module('SdpApp').directive('vendorSelect', ['gettextCatalog', function(gettextCatalog) {
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'app/widgets/vendor-select/vendor-select.template.html',
            scope: {
                vendorId: '=ngModel'
            },
            controller: ['$scope', function ($scope) {
                var HAMRAH = 1;
                var MTN = 2;
                $scope.vendorsInfo = [
                    {
                        id: HAMRAH,
                        title: gettextCatalog.getString('Hamrah-vas')
                    },
                    {
                        id: MTN,
                        title: gettextCatalog.getString('MTN')
                    }
                ];
            }]
        };
    }]);
}());
