(function () {
    'use strict';
    angular.module('SdpApp').directive('datetime', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                var pattern = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}[ ]{1,2}[0-9]{2}:[0-9]{2}:[0-9]{2}$/i;

                //For DOM -> model validation
                ngModel.$parsers.unshift(function (value) {
                    if (value) {
                        ngModel.$setValidity('datetime', value.match(pattern) !== null);
                    }
                    return value;
                });

                //For model -> DOM validation
                ngModel.$formatters.unshift(function (value) {
                    if (value) {
                        ngModel.$setValidity('datetime', value.match(pattern) !== null);
                    }
                    return value;
                });
            }
        };
    });

    angular.module('SdpApp').directive('date', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                var pattern = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/i;

                //For DOM -> model validation
                ngModel.$parsers.unshift(function (value) {
                    if (value) {
                        ngModel.$setValidity('date', value.match(pattern) !== null);
                    }
                    return value;
                });

                //For model -> DOM validation
                ngModel.$formatters.unshift(function (value) {
                    if (value) {
                        ngModel.$setValidity('date', value.match(pattern) !== null);
                    }
                    return value;
                });
            }
        };
    });

    angular.module('SdpApp').directive('passwordVerify', function () {
        return {
            require: 'ngModel',
            scope: {
                passwordVerify: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function (value) {
                    if (value) {
                        ctrl.$parsers.unshift(function (viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity('passwordVerify', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('passwordVerify', true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    });

    angular.module('SdpApp').directive('chargeCode', ['$q', 'chargeCodeService', function ($q, chargeCodeService) {
        return {
            require: 'ngModel',
            scope: {
                price: '=price'
            },
            link: function (scope, element, attrs, ctrl) {

                var chargeCode = new chargeCodeService();

                ctrl.$asyncValidators.chargeCode = function (modelValue, viewValue) {
                    var ids = modelValue || viewValue;
                    var promises = [];
                    var chargeCodes = [];
                    var onSuccessCallBack = function (response) {
                        chargeCodes.push(response.data);
                    };

                    angular.forEach(ids, function (id) {
                        var promise = chargeCode.getById(id).then(onSuccessCallBack);
                        promises.push(promise);
                    });

                    return $q.all(promises).then(function () {
                        chargeCodes.sort(function (chargeCode1, chargeCode2) {
                            return chargeCode1.price < chargeCode2.price;
                        });

                        var remain = scope.price;
                        //modular algorithm
                        angular.forEach(chargeCodes, function (chargeCode) {
                            if (remain >= chargeCode.price) {
                                while (remain >= chargeCode.price) {
                                    remain -= chargeCode.price;
                                }
                            }
                        });

                        if (remain === 0) {
                            return true;
                        }
                        else {
                            return $q.reject('validation fails');
                        }

                    }, function () {
                        //this validation fails
                        return $q.reject('validation fails');
                    });

                };
            }
        };
    }]);
})();
