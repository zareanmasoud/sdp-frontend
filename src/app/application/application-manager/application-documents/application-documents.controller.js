(function () {
    'use strict';

    angular.module('SdpApp').controller('ApplicationDocumentsController', ['$scope', 'applicationService', '$stateParams', 'gettextCatalog', 'toastr', '$state', 'categoryService', 'developerService',
        function ($scope, applicationService, $stateParams, gettextCatalog, toastr, $state, categoryService, developerService) {

            console.log('application documents reached!');
            $scope.formTitle = gettextCatalog.getString('Application Documents');
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

            $scope.reload = function () {
                getApplication();
                getAllCategories();
                getAllDevelopers();
            };

            $scope.reload();
        }]);
}());
