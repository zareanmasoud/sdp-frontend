(function () {
    'use strict';

    angular.module('SdpApp').factory('aclService', ['$http', 'authService', '$state', function ($http, authService, $state) {

        var _getResourcesFromState = function (stateName) {
            var resources = [];

            var states = $state.get();

            states.forEach(function (state) {
                if (stateName.indexOf(state.name) > -1) {
                    if (state.resources !== undefined) {
                        state.resources.forEach(function (resource) {
                            resources.push(resource);
                        }, resources);
                    }
                }
            }, stateName, resources);

            return resources;
        };

        return {

            hasAccess: function (stateName, userResources) {

                userResources = typeof userResources !== 'undefined' ? userResources : null;

                if (!userResources) {
                    userResources = authService.authentication.resources;
                }
                var stateResources = _getResourcesFromState(stateName);
                if (stateResources.length === 0) {
                    return true;
                }
                if (userResources.indexOf('root') !== -1) {
                    return true;
                }

                var r = stateResources.filter(function (elem) {
                    return userResources.indexOf(elem) > -1;
                }, userResources).length;

                return r === stateResources.length;
            },

            getResourcesFromState: _getResourcesFromState,

            hasAnyResourceAccess: function (resources, userResources) {

                userResources = typeof userResources !== 'undefined' ? userResources : null;
                if (!userResources) {
                    userResources = authService.authentication.resources;
                }
                if (resources.length === 0) {
                    return true;
                }
                if (userResources.indexOf('root') !== -1) {
                    return true;
                }

                var r = resources.filter(function (elem) {
                    return userResources.indexOf(elem) > -1;
                }, userResources).length;

                return r > 0;
            },

            hasAllResourceAccess: function (resources, userResources) {

                userResources = typeof userResources !== 'undefined' ? userResources : null;

                if (!userResources) {
                    userResources = authService.authentication.resources;
                }

                if (resources.length === 0) {
                    return true;
                }
                if (userResources.indexOf('root') !== -1) {
                    return true;
                }

                var r = resources.filter(function (elem) {
                    return userResources.indexOf(elem) > -1;
                }, userResources).length;

                return r === resources.length;
            }

        };
    }]);
}());
