/* Setup Layout Part - Sidebar */
(function () {
    'use strict';

    angular.module('SdpApp').controller('SidebarController', ['$scope', '$state', 'applicationService', 'applicationVersionService', 'gettextCatalog', function ($scope, $state, applicationService, applicationVersionService, gettextCatalog) {

        var application = new applicationService();
        var applicationVersion = new applicationVersionService();

        // $scope.formData = {
        //     application_id: parseInt($stateParams.application_id),
        //     app_id: '',
        //     app_name: '',
        //     master_key: '',
        //     client_key: '',
        //     javascript_key: '',
        //     rest_api_key: '',
        //     dot_net_key: '',
        //     port: '',
        //     host: '',
        //     database_uri: ''
        // };

        $scope.selectedApplication = {
                title: gettextCatalog.getString('Select Application'),
                package_name: null
        };

        function getLastVersionTitle(packageName) {
            applicationVersion.getPagedApplicationVersionsByApplicationId(packageName, null, '#form').then(function (response) {
                $scope.versionTitle = response.data.results[response.data.total - 1].title;
            });
            return $scope.versionTitle;
        }

        $scope.initiateApplication = function(item) {
            $scope.selectedApplication.title = item.title;
            $scope.selectedApplication.package_name = item.package_name;
            $scope.selectedApplication.version_title = getLastVersionTitle(item.package_name);
            $state.go('root.app.application.applications.products', {package_name: item.package_name});
        };

        function loadItems() {
            application.getPagedApplications(1, 10, '#form').then(function (response) {
                $scope.applications = response.data.results;
            });
        }

        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            Layout.initSidebar(); // init sidebar
        });

        $scope.reload = function () {
            loadItems();
        };

        $scope.reload();
    }]);
}());
