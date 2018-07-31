(function () {
    'use strict';

    angular.module('SdpApp').controller('ListApplicationsController', ['$rootScope', '$scope', 'applicationService', 'gettextCatalog', '$state', 'uiGridConstants', 'toastr', 'developerService', 'categoryService',
        function ($rootScope, $scope, applicationService, gettextCatalog, $state, uiGridConstants, toastr, developerService, categoryService) {

            var application = new applicationService();
            var developer = new developerService();
            var category = new categoryService();

            $scope.selectedApplication = {
                title: '',
                package_name: null
            };

            var paginationOption = {
                size: 10,
                page: 1
            };

            function getPosition(package_name) {
                var elementPos = -1;
                if (package_name !== null) {
                    elementPos = $scope.gridOptions.data.map(function (x) {
                        return x.package_name;
                    }).indexOf(Number(package_name));
                }
                return elementPos;
            }

            function loadItems(pageNumber, pageSize) {
                if (!pageNumber || !pageSize) {
                    pageNumber = 1;
                    pageSize = $scope.gridOptions.paginationPageSize;
                }

                application.getPagedApplications(pageNumber, pageSize, '#form').then(function (response) {
                    $scope.applications = response.data.results;
                    $scope.gridOptions.totalItems = response.data.total;
                    $scope.gridOptions.data = $scope.applications;
                    $scope.gridApi.core.refresh();

                    var elementPos = getPosition($state.params.package_name);
                    $scope.gridApi.grid.modifyRows($scope.gridOptions.data);
                    $scope.gridApi.selection.selectRow($scope.gridOptions.data[elementPos], true);
                });
            }

            function getApplications() {
                loadItems(paginationOption.page, paginationOption.size);
            }

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

            var applicationVerificationStates = [
                {value: true, label: gettextCatalog.getString('Verified')},
                {value: false, label: gettextCatalog.getString('Not Verified')}
            ];
            var applicationPublishmentStates = [
                {value: true, label: gettextCatalog.getString('Published')},
                {value: false, label: gettextCatalog.getString('Not Published')}
            ];

            $scope.selectVersion = function (application) {
                $scope.selectedApplication = application;
                var elementPos = getPosition(application.package_name);
                if (elementPos >= 0) {
                    $scope.gridApi.selection.selectRow($scope.gridOptions.data[elementPos], true);
                }
                $state.go('root.app.application.applications.applicationVersions', {package_name: application.package_name});
            };

            $scope.selectProduct = function (application) {
                $scope.selectedApplication = application;
                var elementPos = getPosition(application.package_name);
                if (elementPos >= 0) {
                    $scope.gridApi.selection.selectRow($scope.gridOptions.data[elementPos], true);
                }
                $state.go('root.app.application.applications.products', {package_name: application.package_name});
            };

            function getVerifiedState(date) {
                return ((date) && (date !== null));
            }

            function getPublishedState(date) {
                return ((date) && (date !== null));
            }

            $scope.gridOptions = {
                multiSelect: false,
                enableRowSelection: false,
                enableFiltering: true,
                rowHeight: 50,
                enableRowHeaderSelection: false,
                showColumnFooter: false,
                paginationPageSizes: [10, 20, 30],
                paginationPageSize: 10,
                useExternalPagination: true,
                columnDefs: [
                    {
                        field: 'title',
                        displayName: gettextCatalog.getString('Title'),
                        minWidth: 150
                    },
                    // {
                    //     field: 'icon',
                    //     displayName: gettextCatalog.getString('Icon'),
                    //     minWidth: 150
                    // },
                    {
                        field: 'category_id',
                        displayName: gettextCatalog.getString('Category'),
                        cellTemplate: '<span ng-bind-html=\'COL_FIELD | map: grid.appScope.categories:"id":"title"\'></span>',
                        minWidth: 100
                    },
                    {
                        field: 'developer_id',
                        displayName: gettextCatalog.getString('Developer'),
                        cellTemplate: '<span ng-bind-html=\'COL_FIELD | map: grid.appScope.developers:"id":"title"\'></span>',
                        minWidth: 100
                    },
                    {
                        name: gettextCatalog.getString('Products'),
                        enableFiltering: false,
                        cellTemplate: '<a ng-click="grid.appScope.selectProduct(row.entity)" uib-tooltip="{{\'Products\'|translate}}" class="btn blue btn-sm btn-outline sbold"><span translate>Products</span><i class="fa fa-share"></i></a>',
                        minWidth: 120
                    },
                    {
                        name: gettextCatalog.getString('Versions'),
                        enableFiltering: false,
                        cellTemplate: '<a ng-click="grid.appScope.selectVersion(row.entity)" uib-tooltip="{{\'Versions\'|translate}}" class="btn blue btn-sm btn-outline sbold"><span translate>Versions</span><i class="fa fa-share"></i></a>',
                        minWidth: 120
                    },
                    {
                        field: 'verified_at',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        filter: {term: true, selectOptions: applicationVerificationStates, type: uiGridConstants.filter.SELECT},
                        cellFilter: 'row.entity.verified_at',
                        filters: [{
                            condition: function (cellValue) {
                                return getVerifiedState(cellValue);
                            }
                        }],

                        displayName: gettextCatalog.getString('Verified At'),
                        cellTemplate: 'app/application/application-manager/list-applications/verify.partial.html',
                        minWidth: 120
                    },
                    {
                        field: 'published_at',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        filter: {term: true, selectOptions: applicationPublishmentStates, type: uiGridConstants.filter.SELECT},
                        cellFilter: 'row.entity.published_at',
                        filters: [{
                            condition: function (cellValue) {
                                return getPublishedState(cellValue);
                            }
                        }],

                        displayName: gettextCatalog.getString('Published At'),
                        cellTemplate: 'app/application/application-manager/list-applications/publish.partial.html',
                        minWidth: 120
                    },
                    {
                        name: 'action',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        displayName: gettextCatalog.getString('Action'),
                        cellTemplate: 'app/application/application-manager/list-applications/action.partial.html',
                        minWidth: 120
                    }
                ]
            };

            $scope.verifyApplication = function (applicationEntity) {
                var dto = (JSON.parse(JSON.stringify(applicationEntity)));
                application.command(null, '#form', null, dto.package_name, 'verify').then(function () {
                    toastr.success(gettextCatalog.getString('Request Sent successfully'), gettextCatalog.getString('Notification'));

                    application.getById(applicationEntity.package_name, '#form').then(function (response) {
                        var updatedApp = response.data;
                        applicationEntity.verified_at= updatedApp.verified_at;
                    });
                });

            };

            $scope.publishApplication = function (applicationEntity) {
                var dto = (JSON.parse(JSON.stringify(applicationEntity)));
                application.command(null, '#form', null, dto.package_name, 'publish').then(function () {
                    toastr.success(gettextCatalog.getString('Request Sent successfully'), gettextCatalog.getString('Notification'));

                    application.getById(applicationEntity.package_name, '#form').then(function (response) {
                        var updatedApp = response.data;
                        applicationEntity.published_at= updatedApp.published_at;
                    });
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
                $scope.alignment = $rootScope.getAlignment();
                getApplications();
                getAllCategories();
                getAllDevelopers();
            };

            $scope.reload();
        }]);
}());
