(function () {
    'use strict';

    angular.module('SdpApp').factory('authService', ['$rootScope', '$cookieStore', '$http', '$q', 'localStorageService', 'apiServiceBaseUri', 'Base64',
        function ($rootScope, $cookieStore, $http, $q, localStorageService, apiServiceBaseUri, Base64) {

            var authServiceFactory = {};
            var _panelAuthorization = {
                isPanelAuthorized: false,
                username: '',
                remember_me: false,
                token: '',
                resources: [],
                tab_count: 0,
                user_id: null,
                roles : []
            };
            var _authentication = {
                isAuth: false,
                username: '',
                remember_me: false,
                token: '',
                resources: [],
                tab_count: 0,
                user_id: null,
                roles : []
            };

            var _BackURL = '';

            var _logOut = function () {

                localStorageService.remove('authorizationData');

                _authentication.isAuth = false;
                _authentication.username = '';
                _authentication.token = '';
                _authentication.resources = [];
                _authentication.remember_me = false;
                _authentication.tab_count = 0;
                _authentication.user_id = null;
                _authentication.roles = [];

                _BackURL = '';
            };

            var _setCredentials = function (username, password) {
                console.log('setCredentials auth');
                var authdata = Base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            };

            var _clearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            var _panelLogin = function () {
                var data = {
                    username: 'panel',
                    password: 'panel'
                };
                var deferred = $q.defer();
                console.log('panelLogin auth');

                $http.post(apiServiceBaseUri + '/hermes/v1/token?grant_type=client_credentials', data, {headers: {'Content-Type': 'application/json'}}).then(
                    function (response) {
                        console.log('response.data.access_token: ' + response.data.access_token);
                        var panelAuthorizationData = {
                            access_token: response.data.access_token,
                            resources: response.data.resources,
                            user_id: response.data.user_id,
                            username: 'panel',
                            // remember_me: loginData.remember_me,
                            tab_count: 1,
                            roles : []
                        };

                        // response.data.roles.forEach(function (role) {
                        //     panelAuthorizationData.roles.push(role.name);
                        // });
                        // save access token to cookie
                        localStorageService.set('panelAuthorizationData', panelAuthorizationData);
                        // console.log('' + );

                        // _panelAuthorization.isPanelAuthorized = true;
                        _panelAuthorization.username = 'panel';
                        _panelAuthorization.user_id = response.data.user_id;
                        _panelAuthorization.token = response.data.token;
                        _panelAuthorization.resources = response.data.resources;
                        // _panelAuthorization.remember_me = loginData.remember_me;
                        _panelAuthorization.tab_count = 1;
                        _panelAuthorization.roles = panelAuthorizationData.roles;
                        deferred.resolve(response);

                    }, function (err) {
                        _logOut();
                        _clearCredentials();
                        deferred.reject(err);
                    });
                return deferred.promise;
            };

            // function to perform login action, it gets token
            // and set it to cookie.
            var _login = function (loginData) {
                var data = {
                    username: loginData.username,
                    password: loginData.password
                };
                var deferred = $q.defer();

                var panelAuthorizationData = localStorageService.get('panelAuthorizationData');
                panelAuthorizationData.bearer_token = 'Bearer ' + panelAuthorizationData.access_token;
                console.log('panelAuthorizationData.bearer_token: ' + panelAuthorizationData.bearer_token);
                $http.post(apiServiceBaseUri + '/hermes/v1/users/login', data, {headers: {'Content-Type': 'application/json', 'Authorization': panelAuthorizationData.bearer_token}}).then(
                    function (response) {
                        var authorizationData = {
                            token: response.data.token,
                            resources: response.data.resources,
                            user_id: response.data.user_id,
                            username: loginData.username,
                            remember_me: loginData.remember_me,
                            tab_count: 1,
                            roles : []
                        };

                        // response.data.roles.forEach(function (role) {
                        //     authorizationData.roles.push(role.name);
                        // });
                        // save access token to cookie
                        localStorageService.set('authorizationData', authorizationData);

                        _authentication.isAuth = true;
                        _authentication.username = loginData.username;
                        _authentication.user_id = response.data.user_id;
                        _authentication.token = response.data.token;
                        _authentication.resources = response.data.resources;
                        _authentication.remember_me = loginData.remember_me;
                        _authentication.tab_count = 1;
                        _authentication.roles = authorizationData.roles;
                        deferred.resolve(response);

                    }, function (err) {
                        _logOut();
                        _clearCredentials();
                        deferred.reject(err);
                    });
                return deferred.promise;
            };

            var _fillPanelAuthorizationData = function () {

                var panelAuthorizationData = localStorageService.get('panelAuthorizationData');
                if (panelAuthorizationData) {
                    _panelAuthorization.isPanelAuthorized = true;
                    _panelAuthorization.username = panelAuthorizationData.username;
                    _panelAuthorization.token = panelAuthorizationData.token;
                    _panelAuthorization.resources = panelAuthorizationData.resources;
                    _panelAuthorization.tab_count = panelAuthorizationData.tab_count;
                    // _panelAuthorization.remember_me = panelAuthorizationData.remember_me;
                    _panelAuthorization.tab_count++;
                    _panelAuthorization.user_id = panelAuthorizationData.user_id;
                    _panelAuthorization.roles = panelAuthorizationData.roles;

                    localStorageService.set('authorizationData', _panelAuthorization);
                }
            };

            var _fillAuthData = function () {

                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    _authentication.isAuth = true;
                    _authentication.username = authData.username;
                    _authentication.token = authData.token;
                    _authentication.resources = authData.resources;
                    _authentication.tab_count = authData.tab_count;
                    _authentication.remember_me = authData.remember_me;
                    _authentication.tab_count++;
                    _authentication.user_id = authData.user_id;
                    _authentication.roles = authData.roles;

                    localStorageService.set('authorizationData', _authentication);
                }
            };

            var _isPanelAuthorized = function () {
                return _panelAuthorization.isPanelAuthorized;
            };

            var _isAuth = function () {
                return _authentication.isAuth;
            };

            // checks if this closing tab is the last one, if so
            // if yes it logout else decrease tab count.

            // TODO: change stateName to URL
            // setting URL(stateName) for surfing later if user needs it after login
            var _setBackURL = function (stateName) {
                if (stateName) {
                    _BackURL = stateName;
                }
            };

            // exposing URL(stateName) for surfing later if user needs it after login
            var _getBackURL = function () {

                return _BackURL;
            };

            window.onbeforeunload = function () {
                if (!_authentication.remember_me && _authentication.tab_count === 1) {
                    // removes access token form cookie
                    _logOut();
                }
                else if (_authentication.tab_count > 1) {
                    _authentication.tab_count--;
                    localStorageService.set('authorizationData', _authentication);
                }
                return '';
            };

            authServiceFactory.panelLogin = _panelLogin;
            authServiceFactory.login = _login;
            authServiceFactory.logOut = _logOut;
            authServiceFactory.fillPanelAuthorizationData = _fillPanelAuthorizationData;
            authServiceFactory.fillAuthData = _fillAuthData;
            authServiceFactory.authentication = _authentication;
            authServiceFactory.panelAuthorization = _panelAuthorization;
            authServiceFactory.isPanelAuthorized = _isPanelAuthorized;
            authServiceFactory.isAuth = _isAuth;
            authServiceFactory.setBackURL = _setBackURL;
            authServiceFactory.getBackURL = _getBackURL;
            authServiceFactory.setCredentials = _setCredentials;
            authServiceFactory.clearCredentials = _clearCredentials;

            return authServiceFactory;
        }]);
}());
