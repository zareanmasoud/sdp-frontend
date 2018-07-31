(function () {
    'use strict';

    angular.module('SdpApp').controller('NewCategoryController', ['$scope', 'categoryService', '$stateParams', 'gettextCatalog', 'toastr', '$state',
        function ($scope, categoryService, $stateParams, gettextCatalog, toastr, $state) {

            $scope.forms = {};
            $scope.formTitle = gettextCatalog.getString('New Category');
            $scope.isEdit = false;
            var category = new categoryService();

            function clearForm() {
                $scope.formData = {
                    title: ''
                };

                if ($scope.forms.myForm) {
                    $scope.forms.myForm.$setPristine();
                    $scope.forms.myForm.$setUntouched();
                }
            }

            $scope.submit = function () {
                category.new($scope.formData, '#form').then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.categories');
                });
            };

            $scope.reload = function () {
                clearForm();
            };

            $scope.reload();
        }]);
}());
