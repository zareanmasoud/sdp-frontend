(function () {
    'use strict';

    angular.module('SdpApp').controller('ListCategoriesController', ['$scope', 'categoryService', 'gettextCatalog',
        function ($scope, categoryService, gettextCatalog) {

            var category = new categoryService();

            var paginationOption = {
                size: 10,
                page: 1
            };

            function loadItems(pageNumber, pageSize) {
                if (!pageNumber || !pageSize) {
                    pageNumber = 1;
                    pageSize = $scope.gridOptions.paginationPageSize;
                }

                category.getPagedCategories(pageNumber, pageSize, '#form').then(function (response) {
                    $scope.categories = response.data.results;
                    $scope.gridOptions.totalItems = response.data.total;
                    $scope.gridOptions.data = $scope.categories;
                    $scope.gridApi.core.refresh();
                });
            }

            function getCategories() {
                loadItems(paginationOption.page, paginationOption.size);
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
                        field: 'id',
                        displayName: gettextCatalog.getString('ID'),
                        sort: {direction: 'asc', priority: 0},
                        minWidth: 70
                    },
                    {
                        field: 'title',
                        displayName: gettextCatalog.getString('Title'),
                        minWidth: 150
                    },
                    {
                        field: 'created_at',
                        enableFiltering: false,
                        displayName: gettextCatalog.getString('Created At'),
                        cellTemplate: '<div class="ui-grid-cell-contents ltr">{{COL_FIELD}}</div>',
                        minWidth: 120
                    },
                    {
                        field: 'updated_at',
                        enableFiltering: false,
                        displayName: gettextCatalog.getString('Updated At'),
                        cellTemplate: '<div class="ui-grid-cell-contents ltr">{{COL_FIELD}}</div>',
                        minWidth: 120
                    },
                    {
                        name: 'action',
                        enableCellEdit: false,
                        enableSorting: false,
                        enableFiltering: false,
                        displayName: gettextCatalog.getString('Action'),
                        cellTemplate: 'app/application/category-manager/list-categories/action.partial.html',
                        minWidth: 120
                    }
                ]
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
                getCategories();
            };

            $scope.reload();
        }]);
}());
