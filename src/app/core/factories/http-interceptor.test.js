// (function () {
//     'use strict';
//     describe('http-interceptor_factory', function () {
//         var $httpBackend, $state, authService, apiServiceBaseUri, authRequestHandler, baseService, bulkService;
//
//         // Load our api.users module
//         beforeEach(angular.mock.module('SdpApp'));
//
//         // Set our injected Users factory (_Users_) to our local Users variable
//         beforeEach(inject(function (_$httpBackend_, _$state_, _authService_, _apiServiceBaseUri_, _baseService_, _bulkService_) {
//             $httpBackend = _$httpBackend_;
//             $state = _$state_;
//             authService = _authService_;
//             apiServiceBaseUri = _apiServiceBaseUri_;
//             baseService = _baseService_;
//             bulkService = _bulkService_;
//             $httpBackend.whenGET(/.*html.*/).respond();
//             $httpBackend.whenGET(/.*json.*/).respond();
//             $httpBackend.whenGET('/api/generic/entity/registry/appmgr-application-list').respond();
//         }));
//
//         describe('http-interceptor_describe', function () {
//             var entityName, entityService, entity, formData, loginData;
//
//             beforeEach(function () {
//                 entityName = 'entity';
//                 entityService = function () {
//                     baseService.call(this, entityName);
//                 };
//
//                 entityService.prototype = new baseService();
//
//                 entity = new entityService();
//
//                 formData = {
//                     'key': 'value'
//                 };
//             });
//
//             beforeEach(function () {
//
//                 loginData = {
//                     username: 'admin',
//                     password: 'admin',
//                     remember_me: false
//                 };
//                 authService.login(loginData).then(function () {
//                 });
//
//                 var response = {
//                     'user_id': 1,
//                     'username': 'admin',
//                     'token': 'a4ed3aebd2e485c7384cd7209e474439bf24da97',
//                     'resources': ['root'],
//                     'disabled': false,
//                     'roles': [{
//                         'id': 1,
//                         'created_at': '2016-09-07T06:24:40.395423Z',
//                         'updated_at': '2016-09-07T06:24:40.395423Z',
//                         'name': 'user',
//                         'description': 'default role in system',
//                         'mapping': []
//                     }, {
//                         'id': 2,
//                         'created_at': '2016-09-07T06:24:40.395423Z',
//                         'updated_at': '2016-09-07T06:24:40.395423Z',
//                         'name': 'root',
//                         'description': 'root group in system',
//                         'mapping': ['root']
//                     }]
//                 };
//
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/user/login');
//                 authRequestHandler.respond(200, response);
//
//                 $httpBackend.flush();
//             });
//
//             it('request', function () {
//                 entity.new(formData, '#form').then(function (response) {
//                     expect(response.data.id).toEqual(5);
//                 });
//
//                 formData.id = 5;
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/generic/entity/' + entityName);
//                 authRequestHandler.respond(200, formData);
//
//                 $httpBackend.flush();
//             });
//
//             it('responseError', function () {
//                 entity.new(formData, '#form').then(function (response) {
//                     expect(response.data.id).toEqual(5);
//                 });
//
//                 formData.id = 5;
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/generic/entity/' + entityName);
//                 authRequestHandler.respond(403, formData);
//
//                 $httpBackend.flush();
//             });
//
//             it('responseError_rejection.status404', function () {
//                 entity.new(formData, '#form').then(function (response) {
//                     expect(response.data.id).toEqual(5);
//                 });
//
//                 formData.id = 5;
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/generic/entity/' + entityName);
//                 authRequestHandler.respond(404, formData);
//
//                 $httpBackend.flush();
//             });
//
//             it('responseError_rejection.status401', function () {
//                 entity.new(formData, '#form').then(function (response) {
//                     expect(response.data.id).toEqual(5);
//                 });
//
//                 formData.id = 5;
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/generic/entity/' + entityName);
//                 authRequestHandler.respond(401, formData);
//
//                 $httpBackend.flush();
//             });
//
//             it('responseError_rejection.status503', function () {
//                 entity.new(formData, '#form').then(function (response) {
//                     expect(response.data.id).toEqual(5);
//                 });
//
//                 formData.id = 5;
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/generic/entity/' + entityName);
//                 authRequestHandler.respond(503, formData);
//
//                 $httpBackend.flush();
//             });
//
//             it('responseError_rejection.statusElse100', function () {
//                 entity.new(formData, '#form').then(function (response) {
//                     expect(response.data.id).toEqual(5);
//                 });
//
//                 formData.id = 5;
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/generic/entity/' + entityName);
//                 authRequestHandler.respond(100, formData);
//
//                 $httpBackend.flush();
//             });
//
//             afterAll(function () {
//                 authService.logout();
//             });
//         });
//     });
// })();
