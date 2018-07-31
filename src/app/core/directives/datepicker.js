(function () {
    'use strict';

    angular.module('SdpApp').directive('faDatetimepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var placement = attrs.placement || 'left';
                $(function () {
                    element.MdPersianDateTimePicker({
                        Placement: placement, // default is 'left'
                        EnglishNumber: true
                    });
                });

                function fromUser(date) {
                    if (date === null || date === '') {return;}
                    return moment(date, 'jYYYY/jMM/jDD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
                }

                function toUser(date) {
                    if (date === null || date === '') {return;}
                    return moment(date, 'YYYY-MM-DDTHH:mm:ssZ').format('jYYYY/jMM/jDD HH:mm:ss');
                }

                ngModel.$parsers.push(fromUser);
                ngModel.$formatters.push(toUser);

            }
        };
    });

    angular.module('SdpApp').directive('faDatepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var placement = attrs.placement || 'left';
                $(function () {
                    element.MdPersianDateTimePicker({
                        Placement: placement, // default is 'left'
                        EnableTimePicker: false,
                        EnglishNumber: true
                    });
                });

                function fromUser(date) {
                    if (date === null || date === '') {return;}
                    return moment(date, 'jYYYY/jMM/jDD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
                }

                function toUser(date) {
                    if (date === null || date === '') {return;}
                    return moment(date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
                }

                ngModel.$parsers.push(fromUser);
                ngModel.$formatters.push(toUser);

            }
        };
    });

    angular.module('SdpApp').directive('uiGridEditDatepicker', ['$timeout', '$document', 'uiGridConstants', 'uiGridEditConstants', function ($timeout, $document, uiGridConstants, uiGridEditConstants) {
        return {
            template: function (element, attrs) {
                return '<div class="datepicker-wrapper" ><input type="text" class="form-control fa-datepicker" fa-datetimepicker placement="right" is-open="isOpen" ng-model="' + attrs.rowField + '" ng-change="changeDate($event)" on-open-focus="false"></div>';
            },
            require: ['?^uiGrid', '?^uiGridRenderContainer'],
            scope: true,
            link: function ($scope, $elm, $attrs, controllers) {

                $scope.isOpen = true;

                var uiGridCtrl = controllers[0];
                var renderContainerCtrl = controllers[1];

                var onWindowClick = function (evt) {
                    var classNamed = angular.element(evt.target).attr('data-name');
                    if (classNamed) {
                        var inDatepicker = (classNamed.indexOf('Md-PersianDateTimePicker') > -1);
                        if (!inDatepicker && evt.target.nodeName !== 'INPUT') {
                            $scope.stopEdit(evt);
                        }
                    }
                };

                var onCellClick = function (evt) {
                    angular.element(document.querySelectorAll('.ui-grid-cell-contents')).off('click', onCellClick);
                    $scope.stopEdit(evt);
                };

                $scope.changeDate = function (evt) {
                    if (!$scope.isOpen) {
                        $scope.stopEdit(evt);
                    }
                };

                $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
                    if (uiGridCtrl.grid.api.cellNav) {
                        uiGridCtrl.grid.api.cellNav.on.navigate($scope, function () {
                            $scope.stopEdit();
                        });
                    } else {
                        angular.element(document.querySelectorAll('.ui-grid-cell-contents')).on('click', onCellClick);
                    }
                    angular.element(window).on('click', onWindowClick);
                });

                $scope.$on('$destroy', function () {
                    angular.element(window).off('click', onWindowClick);
                });

                $scope.stopEdit = function () {
                    $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                };

                $elm.on('keydown', function (evt) {
                    switch (evt.keyCode) {
                        case uiGridConstants.keymap.ESC:
                            evt.stopPropagation();
                            $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                            break;
                    }
                    if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                        evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                        if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                            $scope.stopEdit(evt);
                        }
                    } else {
                        switch (evt.keyCode) {
                            case uiGridConstants.keymap.ENTER:
                            case uiGridConstants.keymap.TAB:
                                evt.stopPropagation();
                                evt.preventDefault();
                                $scope.stopEdit(evt);
                                break;
                        }
                    }
                    return true;
                });

            }
        };
    }]);
}());
