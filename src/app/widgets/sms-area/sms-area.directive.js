//<sms-area patterns="patterns" ng-model='text'></sms-area>

(function () {
    'use strict';

    angular.module('SdpApp').directive('smsArea', [function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'widgets/sms-area/sms-area.template.html',
            replace: true,
            scope: {
                text: '=ngModel',
                bodyFormat: '=bodyFormat'
            },
            controller: ['$scope', function ($scope) {

                $scope.patterns = [];


                var replace = function (text) {
                    if (text) {
                        $scope.review = text;
                        $scope.patterns.forEach(function (pattern) {
                            var reg = new RegExp(pattern.name, 'g');
                            $scope.review = $scope.review.replace(reg, pattern.default);
                        });
                    }
                    else {
                        $scope.review = '';
                    }
                };

                $scope.$watch('text', function (newValue) {
                        replace(newValue);
                });

                $scope.$watch('patterns', function (newValue) {
                    var at_config = {
                        at: '{{',
                        data: newValue,
                        insertTpl: '${name}',
                        displayTpl: '<li>${description}</li>',
                        limit: 200
                    };
                    var elem = jQuery('#inputor');
                    elem.atwho(at_config).caret('pos', 47);
                        replace($scope.text);
                });

                $scope.$watch('bodyFormat', function (newValue) {
                    var newData = [];
                    if (newValue && newValue.length > 0 ) {
                        newValue.forEach(function (pattern) {
                            newData.push({
                                description: pattern.description,
                                name: '{{.' + pattern.name + '}}',
                                default: pattern.default,
                                type: pattern.type
                            });
                        });
                    }
                    $scope.patterns = newData;
                });
            }]
        };
    }]);
}());
