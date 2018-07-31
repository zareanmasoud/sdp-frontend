(function () {
    'use strict';

    angular.module('SdpApp').controller('NewApplicationVersionController', ['$scope', 'applicationVersionService', '$stateParams', 'gettextCatalog', 'toastr', '$state',
        function ($scope, applicationVersionService, $stateParams, gettextCatalog, toastr, $state) {

            console.log('new version');
            $scope.forms = {};
            $scope.formTitle = gettextCatalog.getString('New Application Version');
            $scope.isEdit = false;
            var applicationVersion = new applicationVersionService();

            function clearForm() {
                $scope.formData = {
                    package_name: $stateParams.package_name,
                    file: null,
                    version_code: null,
                    title: '',
                    changelog: '',
                    filename: '',
                    filesize: 0,
                    id: null,
                    published_at: null,
                    verified_at: null,
                    version_name: ''
                };

                if ($scope.forms.myForm) {
                    $scope.forms.myForm.$setPristine();
                    $scope.forms.myForm.$setUntouched();
                }
            }

            $scope.submit = function () {
                var config = {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                };

                applicationVersion.newByField($scope.formData.file, '#form', $stateParams.package_name, config).then(function () {
                    // toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    // $state.go('root.app.application.applications.applicationVersions.editApplicationVersion', {'version_code' : results.data.version_code});
                });

                applicationVersion.updateByField($scope.formData, '#form', $stateParams.package_name, $stateParams.version_code).then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.applications.applicationVersions', {'application_id': $stateParams.application_id});
                });

            };

            $scope.reload = function () {
                clearForm();
            };

            $scope.reload();
        }]);
}());
