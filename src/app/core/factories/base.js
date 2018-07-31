(function () {
    'use strict';

    angular.module('SdpApp').factory('baseService', ['$q', '$http', 'apiServiceBaseUri', 'uiHandler', function ($q, $http, apiServiceBaseUri, uiHandler) {

        var baseService = function (serviceName, entityName, parentEntity) {

            if (parentEntity) {
                this.objectUrl = apiServiceBaseUri + '/' + serviceName + '/' + parentEntity;
            } else {
                this.objectUrl = apiServiceBaseUri + '/' + serviceName + '/' + entityName;
            }

            this.EntityName = entityName;


            this.getByFilter = function (element, urlData, parentId) {
                var self = this;
                var url;

                if (parentId) {
                    url = self.objectUrl + '/' + parentId + '/' + self.EntityName;
                } else {
                    url = self.objectUrl;
                }

                urlData = typeof urlData !== 'undefined' ? urlData : null;

                var queryString = '';
                if (urlData) {
                    for (var key in urlData) {
                        /* istanbul ignore else */
                        if (urlData.hasOwnProperty(key)) {
                            var value = urlData[key];
                            queryString += key + '=' + encodeURIComponent(value) + '&';
                        }
                    }
                    queryString = '?' + queryString;
                }
                uiHandler.startLoading(element);
                return $http.get(url + queryString).success(function (data, status, headers, config) {
                    var results = [];
                    results.data = data;
                    results.headers = headers();
                    results.status = status;
                    results.config = config;
                    uiHandler.stopLoading(element);
                    $q.resolve(results);
                }).error(function (data, status, headers, config) {
                    uiHandler.stopLoading(element);
                    $q.reject(data, status, headers, config);
                });
            };

            this.newByFilter = function (object, element, parentEntity, parentID) {
                var self = this;

                if (parentEntity) {
                    console.log('parentID: ' + parentID);
                    this.objectUrl = apiServiceBaseUri + '/' + serviceName + '/' + parentEntity + '/' + parentID + '/' + entityName;
                }

                uiHandler.startLoading(element);

                var config = {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                };
                return $http.post(self.objectUrl, object, config).success(function (data, status, headers, config) {
                    var results = [];
                    results.data = data;
                    results.headers = headers();
                    results.status = status;
                    results.config = config;
                    uiHandler.stopLoading(element);
                    $q.resolve(results);
                }).error(function (data, status, headers, config) {
                    uiHandler.stopLoading(element);
                    $q.reject(data, status, headers, config);
                });
            };
        };

        baseService.prototype.getById = function (id, element, parentId) {
            var self = this;
            var url;

            if (parentId) {
                url = self.objectUrl + '/' + parentId + '/' + self.EntityName + '/' +  id;
            } else {
                url = self.objectUrl + '/' + id;
            }

            uiHandler.startLoading(element);
            return $http.get(url).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.getByField = function (object, element) {
            var self = this;
            uiHandler.startLoading(element);
            return $http.get(self.objectUrl + '/' + object.package_name, object).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.new = function (object, element, urlData) {

            urlData = typeof urlData !== 'undefined' ? urlData : null;

            var queryString = '';
            if (urlData) {
                for (var key in urlData) {
                    /* istanbul ignore else */
                    if (urlData.hasOwnProperty(key)) {
                        var value = urlData[key];
                        queryString += key + '=' + encodeURIComponent(value) + '&';
                    }
                    else {

                    }
                }
                queryString = '?' + queryString;
            }
            var self = this;
            uiHandler.startLoading(element);
            delete object.id;
            return $http.post(self.objectUrl + queryString, object).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.newByField = function (object, element, parentId, config) {
            var self = this;
            var url;

            if (parentId) {
                url = self.objectUrl + '/' + parentId + '/' + self.EntityName;
            } else {
                url = self.objectUrl;
            }

            uiHandler.startLoading(element);
            return $http.post(url, object, config).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.update = function (object, element) {
            var self = this;
            uiHandler.startLoading(element);
            return $http.put(self.objectUrl + '/' + object.id, object).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.updateByField = function (object, element, parentId, id) {
            var self = this;
            var url;

            if (parentId) {
                url = self.objectUrl + '/' + parentId + '/' + self.EntityName + '/' +  id;
            } else {
                url = self.objectUrl + '/' + id;
            }

            uiHandler.startLoading(element);
            return $http.put(url, object).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.command = function (object, element, parentId, id, route) {
            var self = this;
            var url;

            if (parentId) {
                url = self.objectUrl + '/' + parentId + '/' + self.EntityName + '/' +  id;
            } else {
                url = self.objectUrl + '/' + id;
            }

            uiHandler.startLoading(element);
            return $http.put(url + '/' + route, {}).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.getAllLocal = function (url, element) {
            uiHandler.startLoading(element);
            return $http.get(url).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.delete = function (id, element) {
            var self = this;
            uiHandler.startLoading(element);
            return $http({
                url: self.objectUrl + '/' + id,
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                uiHandler.stopLoading(element);
                $q.resolve(results);
            }).error(function (data, status, headers, config) {
                uiHandler.stopLoading(element);
                $q.reject(data, status, headers, config);
            });
        };

        baseService.prototype.getAll = function (element) {
            var self = this;
            return self.get(element);
        };

        baseService.prototype.get = function (element, urlData, parentEntity, parentID) {
            var self = this;
            return self.getByFilter(element, urlData, parentEntity, parentID);
        };

        return baseService;
    }
    ]);
}());
