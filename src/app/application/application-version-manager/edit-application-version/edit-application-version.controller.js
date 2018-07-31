(function () {
    'use strict';

    angular.module('SdpApp').controller('EditApplicationVersionController', ['$scope', 'applicationVersionService', '$stateParams', 'gettextCatalog', 'toastr', '$state',
        function ($scope, applicationVersionService, $stateParams, gettextCatalog, toastr, $state) {

            console.log('edit version controller');

            $scope.formTitle = gettextCatalog.getString('Edit Application Version');
            $scope.isEdit = true;
            var applicationVersion = new applicationVersionService();

            function getApplicationVersion() {
                console.log('$stateParams.package_name: ' + $stateParams.package_name);
                console.log('$stateParams.version_code: ' + $stateParams.version_code);

                applicationVersion.getById($stateParams.version_code, '#form', $stateParams.package_name).then(function (response) {
                    $scope.formData = response.data;
                });
            }

            $scope.submit = function () {
                delete $scope.formData.created_at;
                delete $scope.formData.updated_at;
                delete $scope.formData.version_code;
                delete $scope.formData.file;
                delete $scope.formData.binary_sha_1;
                delete $scope.formData.binary_sha_256;
                delete $scope.formData.filename;
                delete $scope.formData.filesize;
                delete $scope.formData.id;
                delete $scope.formData.published_at;
                delete $scope.formData.verified_at;
                delete $scope.formData.version_name;
                delete $scope.formData.package_name;

                applicationVersion.updateByField($scope.formData, '#form', $stateParams.package_name, $stateParams.version_code).then(function () {
                    toastr.success(gettextCatalog.getString('Request Done successfully'), gettextCatalog.getString('Notification'));
                    $state.go('root.app.application.applications.applicationVersions', {'application_id': $stateParams.application_id});
                });
            };

            $scope.reload = function () {
                getApplicationVersion();
            };

            $scope.reload();
        }]);
}());
