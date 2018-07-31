(function () {
    'use strict';

    angular.module('SdpApp').directive('taginput', ['gettextCatalog', function (gettextCatalog) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                tags: '=ngModel'
            },
            link: function (scope, element, attrs) {
                var importing = false;
                var changing = false;

                element.tagsInput({
                    width: 'auto',
                    height: 'auto',
                    autocomplete: {},
                    defaultText: attrs.defaultText || gettextCatalog.getString('Add a tag'),
                    onChange: function () {
                        if (!importing) {
                            if (element.val() !== '') {
                                changing = true;
                                scope.tags = element.val();
                                scope.$apply();
                                changing = false;
                            }
                            else {
                                scope.tags = '';
                                scope.$apply();
                            }
                        }
                    }
                });

                scope.$watch('tags', function (newValue) {
                    if (!changing) {
                        importing = true;
                        if (newValue && newValue.length > 0) {
                            if (Object.prototype.toString.call(newValue) === '[object Array]') {
                                element.importTags(newValue.join());
                            }
                        }
                        else {
                            element.val('');
                            element.importTags('');
                        }
                        importing = false;
                    }
                });

            }
        };
    }]);
}());
