(function () {
    'use strict';

    angular.module('SdpApp').controller('EditCategoryController', ['$scope', 'categoryService', '$stateParams', 'gettextCatalog', 'toastr', '$state',
        function ($scope, categoryService, $stateParams, gettextCatalog, toastr, $state) {

            $scope.formTitle = gettextCatalog.getString('Edit Category');
            $scope.isEdit = true;
            var category = new categoryService();

            function getCategory() {
                category.getById($stateParams.id, '#form').then(function (response) {
                    $scope.formData = response.data;
                });
            }

            $scope.submit = function () {
                delete $scope.formData.created_at;
                delete $scope.formData.updated_at;

                category.update($scope.formData, '#form').then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.categories');
                });
            };

            $scope.reload = function () {
                getCategory();
            };

            $scope.reload();
        }]);
}());
