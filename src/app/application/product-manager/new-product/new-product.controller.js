(function () {
    'use strict';

    angular.module('SdpApp').controller('NewProductController', ['$scope', 'productService', 'applicationService', '$stateParams', 'gettextCatalog', 'toastr', '$state',
        function ($scope, productService, applicationService, $stateParams, gettextCatalog, toastr, $state) {

            console.log('new product controller reached');
            $scope.forms = {};
            $scope.formTitle = gettextCatalog.getString('New Product');
            var product = new productService();
            var application = new applicationService();

            $scope.isEdit = false;

            $scope.productTypes = product.getProductTypes();
            $scope.subscriptionTypes = product.getSubscriptionTypes();

            console.log('$stateParams.package_name: ' + $stateParams.package_name);

            function getApplication() {
                application.getById($stateParams.package_name, '#form').then(function (response) {
                    console.log('$stateParams.package_name: ' + $stateParams.package_name);
                    $scope.application_title = response.data.title;
                });
            }

            function clearForm() {
                $scope.formData = {
                    title: '',
                    description: '',
                    type: 1,
                    subscription_type: 0,
                    price: 0,
                    sku: '',
                    subscription_period: 30,
                    trial_period: 0,
                    grace_period: 0,
                    introductory_price: '',
                    introductory_price_period: '',
                    auto_renewing: true,
                    published_at: null,
                    package_name: $stateParams.package_name,
                    enabled: true
                };

                if ($scope.forms.myForm) {
                    $scope.forms.myForm.$setPristine();
                    $scope.forms.myForm.$setUntouched();
                }
            }

            $scope.submit = function () {
                delete $scope.formData.published_at;
                delete $scope.formData.package_name;


                var dto = JSON.parse(JSON.stringify($scope.formData));
                // dto.application_id = Number($scope.formData.application_id);

                product.newByField(dto, '#form', $stateParams.package_name).then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.applications.products', {'package_name': $stateParams.package_name});
                });
            };

            $scope.reload = function () {
                clearForm();
                getApplication();
            };

            $scope.reload();
        }]);
}());
