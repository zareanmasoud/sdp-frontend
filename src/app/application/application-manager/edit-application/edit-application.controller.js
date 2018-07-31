(function () {
    'use strict';

    angular.module('SdpApp').controller('EditApplicationController', ['$scope', 'applicationService', '$stateParams', 'gettextCatalog', 'toastr', '$state', 'categoryService', 'developerService',
        function ($scope, applicationService, $stateParams, gettextCatalog, toastr, $state, categoryService, developerService) {

            console.log('edit application reached!');
            $scope.formTitle = gettextCatalog.getString('Edit Application');
            $scope.isEdit = true;
            var application = new applicationService();
            var category = new categoryService();
            var developer = new developerService();

            function getAllCategories() {
                category.getAll('#form').then(function (response) {
                    $scope.categories = response.data.results;
                });
            }

            function getAllDevelopers() {
                developer.getAll('#form').then(function (response) {
                    $scope.developers = response.data.results;
                });
            }

            function getApplication() {
                application.getById($stateParams.package_name, '#form').then(function (response) {
                    $scope.formData = response.data;
                });
            }

            $scope.submit = function () {
                delete $scope.formData.created_at;
                delete $scope.formData.updated_at;
                delete $scope.formData.verified_at;
                delete $scope.formData.published_at;
                delete $scope.formData.api_key;
                delete $scope.formData.developer_id;
                delete $scope.formData.developer_private;
                delete $scope.formData.developer_public;

                application.updateByField($scope.formData, '#form', null, $stateParams.package_name).then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.applications');
                });
            };

            $scope.reload = function () {
                getApplication();
                getAllCategories();
                getAllDevelopers();
            };

            $scope.reload();
        }]);
}());
