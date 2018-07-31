(function () {
    'use strict';

    angular.module('SdpApp').controller('NewApplicationController', ['$scope', 'applicationService', '$stateParams', 'gettextCatalog', 'toastr', '$state', 'categoryService', 'developerService',
        function ($scope, applicationService, $stateParams, gettextCatalog, toastr, $state, categoryService, developerService) {

            $scope.forms = {};
            $scope.formTitle = gettextCatalog.getString('New Application');
            $scope.isEdit = false;
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


            function clearForm() {
                $scope.formData = {
                    title: '',
                    package_name: '',
                    description: '',
                    icon: '',
                    screenshots: '',
                    category_id: '',
                    verified_at: null,
                    published_at: null
                };

                if ($scope.forms.myForm) {
                    $scope.forms.myForm.$setPristine();
                    $scope.forms.myForm.$setUntouched();
                }
            }

            $scope.submit = function () {
                delete $scope.formData.verified_at;
                delete $scope.formData.published_at;

                console.log($scope.formData);
                application.newByField($scope.formData, '#form').then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.applications');
                });
            };

            $scope.reload = function () {
                clearForm();
                getAllCategories();
                getAllDevelopers();
            };

            $scope.reload();
        }]);
}());
