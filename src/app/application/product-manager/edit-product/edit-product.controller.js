(function () {
    'use strict';

    angular.module('SdpApp').controller('EditProductController', ['$scope', 'productService', 'applicationService', '$stateParams', 'gettextCatalog', 'toastr', '$state',
        function ($scope, productService, applicationService, $stateParams, gettextCatalog, toastr, $state) {

            console.log('edit product controller reached!');

            $scope.formTitle = gettextCatalog.getString('Edit Product');
            var product = new productService();
            var application = new applicationService();

            $scope.isEdit = true;

            function getProduct() {
                product.getById($stateParams.sku, '#form', $stateParams.package_name).then(function (response) {
                    console.log('getProductById called');
                    $scope.formData = response.data;
                });
            }

            function getApplication() {
                application.getById($stateParams.package_name, '#form').then(function (response) {
                    $scope.application_title = response.data.title;
                });
            }

            $scope.submit = function () {
                delete $scope.formData.created_at;
                delete $scope.formData.updated_at;
                delete $scope.formData.package_name;
                delete $scope.formData.sku;
                delete $scope.formData.published_at;

                var dto = JSON.parse(JSON.stringify($scope.formData));
                // dto.application_id = Number($scope.formData.application_id);

                product.updateByField(dto, '#form', $stateParams.package_name, $stateParams.sku).then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.applications.products', {'package_name': $stateParams.package_name});
                });
            };

            $scope.reload = function () {
                getProduct();
                getApplication();
            };

            $scope.reload();
        }]);
}());
