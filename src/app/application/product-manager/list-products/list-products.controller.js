(function () {
    'use strict';

    angular.module('SdpApp').controller('ListProductsController', ['$scope', 'productService', 'generalService', 'gettextCatalog', '$state', '$stateParams', 'uiGridConstants', 'toastr',
        function ($scope, productService, generalService, gettextCatalog, $state, $stateParams, uiGridConstants, toastr) {

            $scope.package_name = $stateParams.package_name;

            var product = new productService();

            var paginationOption = {
                size: 10,
                page: 1
            };

            function loadItems(packageName, pageNumber, pageSize) {
                if (!pageNumber || !pageSize) {
                    pageNumber = 1;
                    pageSize = $scope.gridOptions.paginationPageSize;
                }

                product.getPagedProductsByApplicationId(packageName, pageNumber, pageSize, '#form').then(function (response) {
                    $scope.products = response.data.results;
                    $scope.gridOptions.totalItems = response.data.total;
                    $scope.gridOptions.data = $scope.products;
                    $scope.gridApi.core.refresh();
                });
            }

            function getProductsByApplicationId(packageName) {
                loadItems(packageName, paginationOption.page, paginationOption.size);
            }

            var productPublishmentStates = [
                {value: true, label: gettextCatalog.getString('Published')},
                {value: false, label: gettextCatalog.getString('Stopped')}
            ];

            function getPublishedState(cellValue) {
                return ((cellValue) && (cellValue !== null));
            }

            $scope.gridOptions = {
                multiSelect: false,
                enableRowSelection: true,
                i18n: 'fa',
                enableFiltering: true,
                rowHeight: 50,
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
                        minWidth: 150
                    },
                    {
                        field: 'price',
                        displayName: gettextCatalog.getString('Price'),
                        minWidth: 150
                    },
                    {
                        field: 'package_name',
                        displayName: gettextCatalog.getString('Package Name'),
                        minWidth: 150
                    },
                    {
                        field: 'published_at',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: true,

                        filter: {term: true, selectOptions: productPublishmentStates, type: uiGridConstants.filter.SELECT},
                        filters: [{
                            condition: function (cellValue, searchTerm) {
                                return getPublishedState(cellValue, searchTerm);
                            }
                        }],

                        displayName: gettextCatalog.getString('Published At'),
                        cellTemplate: 'app/application/product-manager/list-products/publish.partial.html',
                        minWidth: 120
                    },
                    {
                        name: 'action',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,

                        displayName: gettextCatalog.getString('Action'),
                        cellTemplate: 'app/application/product-manager/list-products/action.partial.html',
                        minWidth: 120
                    }
                ]
            };

            $scope.publishProduct = function (productEntity) {
                var dto = (JSON.parse(JSON.stringify(productEntity)));
                product.command(null, '#form', dto.package_name, dto.sku, 'publish').then(function () {
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
                getProductsByApplicationId($scope.package_name);
            };

            $scope.reload();
        }]);
}());
