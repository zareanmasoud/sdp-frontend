(function () {
    'use strict';

    angular.module('SdpApp').factory('uiGridFactory', [function () {

        var factory = {};

        /* It returns a dropdown filter to help you show editDropdownValueLabel
         *
         * Parameters:
         *
         * - input: selected input value, it always comes when you select a dropdown value
         * - map: Dictionary containing the catalog info. For example:
         *    $scope.languageCatalog = [ {'id': 'EN', 'description': 'English'}, {'id': 'ES', 'description': 'Español'} ]
         * - idLabel: ID label. For this example: 'id'.
         * - valueLabel: Value label. For this example: 'description'.
         *
         * 1) Configure cellFilter this way at the ui-grid colDef:
         *
         * { field: 'languageId', name: 'Language'), editableCellTemplate: 'ui-grid/dropdownEditor',
         *   editDropdownIdLabel: 'id', editDropdownValueLabel: 'description',
         *   editDropdownOptionsArray: $scope.languageCatalog,
         *   cellFilter: 'mapDropdown:row:row.grid.appScope.languageCatalog:"id":"description":languageCatalog' },
         *
         * 2) Append this snippet to the controller:
         *
         * .filter('mapDropdown', function(uiGridFactory) {
         *    return uiGridFactory.getMapDrowdownFilter()
         * });
         *
         */
        factory.getMapFilter = function () {
            return function (input, map, idLabel, valueLabel) {
                /* istanbul ignore else */
                if ((map !== null) && (map !== undefined)) {
                    for (var i = 0; i < map.length; i++) {
                        /* istanbul ignore else */
                        if (map[i][idLabel] === input) {
                            return map[i][valueLabel];
                        }
                    }
                }
                return '';
            };
        };

        factory.getMapFilters = function () {
            return function (input, map, idLabel, valueLabel) {
                var output = [];
                /* istanbul ignore else */
                if ((map !== null) && (map !== undefined)) {
                    for (var i = 0; i < map.length; i++) {
                        for (var j = 0; j < input.length; j++) {
                            if (map[i][idLabel] === input[j]) {
                                output.push(map[i][valueLabel]);
                            }
                        }
                    }
                    return output.toString();
                }
                return '';
            };
        };

        return factory;
    }]);
}());
