(function () {
    'use strict';

    angular.module('SdpApp').controller('ListApplicationVersionsController', ['$scope', 'applicationVersionService', 'gettextCatalog', '$stateParams', 'uiGridConstants', 'toastr',
        function ($scope, applicationVersionService, gettextCatalog, $stateParams, uiGridConstants, toastr) {

            $scope.package_name = $stateParams.package_name;

            var applicationVersion = new applicationVersionService();

            var paginationOption = {
                size: 10,
                page: 1
            };

            function loadItems(packageName, pageNumber, pageSize) {
                if (!pageNumber || !pageSize) {
                    pageNumber = 1;
                    pageSize = $scope.gridOptions.paginationPageSize;
                }

                applicationVersion.getPagedApplicationVersionsByApplicationId(packageName, pageNumber, pageSize, '#form').then(function (response) {
                    $scope.applicationVersions = response.data.results;
                    console.log($scope.applicationVersions);
                    $scope.gridOptions.totalItems = response.data.total;
                    $scope.gridOptions.data = $scope.applicationVersions;
                    $scope.gridApi.core.refresh();
                });
            }

            function getApplicationVersionsByApplicationId(packageName) {
                loadItems(packageName, paginationOption.page, paginationOption.size);
            }

            var versionVerificationStates = [
                {value: true, label: gettextCatalog.getString('Verified')},
                {value: false, label: gettextCatalog.getString('Not Verified')}
            ];
            var versionPublishmentStates = [
                {value: true, label: gettextCatalog.getString('Published')},
                {value: false, label: gettextCatalog.getString('Not Published')}
            ];

            function getVerifiedState(date) {
                return ((date) && (date !== null));
            }

            function getPublishedState(date) {
                return ((date) && (date !== null));
            }

            $scope.gridOptions = {
                multiSelect: false,
                enableRowSelection: true,
                i18n: 'fa',
                enableFiltering: true,
                rowHeight: 50,
                enableRowHeaderSelection: false,
                showColumnFooter: false,
                paginationPageSizes: [10, 20, 30],
                paginationPageSize: 10,
                useExternalPagination: true,
                columnDefs: [
                    {
                        field: 'id',
                        displayName: gettextCatalog.getString('ID'),
                        sort: { direction: 'asc', priority: 0 },
                        minWidth: 70
                    },
                    {
                        field: 'title',
                        displayName: gettextCatalog.getString('Title'),
                        minWidth: 130
                    },
                    {
                        field: 'version_name',
                        displayName: gettextCatalog.getString('Version Name'),
                        minWidth: 130
                    },
                    {
                        field: 'package_name',
                        displayName: gettextCatalog.getString('Package Name'),
                        minWidth: 130
                    },
                    {
                        field: 'verified_at',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        filter: {term: true, selectOptions: versionVerificationStates, type: uiGridConstants.filter.SELECT},
                        cellFilter: 'row.entity.verified_at',
                        filters: [{
                            condition: function (cellValue) {
                                return getVerifiedState(cellValue);
                            }
                        }],

                        displayName: gettextCatalog.getString('Verified At'),
                        cellTemplate: 'app/application/application-version-manager/list-application-versions/verify.partial.html',
                        minWidth: 120
                    },
                    {
                        field: 'published_at',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        filter: {term: true, selectOptions: versionPublishmentStates, type: uiGridConstants.filter.SELECT},
                        cellFilter: 'row.entity.published_at',
                        filters: [{
                            condition: function (cellValue) {
                                return getPublishedState(cellValue);
                            }
                        }],

                        displayName: gettextCatalog.getString('Published At'),
                        cellTemplate: 'app/application/application-version-manager/list-application-versions/publish.partial.html',
                        minWidth: 120
                    },
                    {
                        name: 'action',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        displayName: gettextCatalog.getString('Action'),
                        cellTemplate: 'app/application/application-version-manager/list-application-versions/action.partial.html',
                        minWidth: 120
                    }
                ]
            };

            $scope.verifyVersion = function (versionEntity) {
                var dto = (JSON.parse(JSON.stringify(versionEntity)));
                applicationVersion.command(null, '#form', dto.package_name, dto.version_code, 'verify').then(function () {
                    toastr.success(gettextCatalog.getString('Request Sent successfully'), gettextCatalog.getString('Notification'));
                });
            };

            $scope.publishVersion= function (versionEntity) {
                var dto = (JSON.parse(JSON.stringify(versionEntity)));
                applicationVersion.command(null, '#form', dto.package_name, dto.version_code, 'publish').then(function () {
                    toastr.success(gettextCatalog.getString('Request Sent successfully'), gettextCatalog.getString('Notification'));
                });
            };

            $scope.gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;

                function paginationChangedHandlerCallback(newPage, pageSize) {
                    loadItems(newPage, pageSize);
                    paginationOption.page = newPage;
                    paginationOption.size = pageSize;
                }

                $scope.gridApi.pagination.on.paginationChanged($scope, paginationChangedHandlerCallback);
            };

            $scope.reload = function () {
                getApplicationVersionsByApplicationId($scope.package_name);
            };

            $scope.reload();
        }]);
}());
