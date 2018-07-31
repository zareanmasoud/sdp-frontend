(function () {
    'use strict';
    describe('base_factory', function () {
        var $httpBackend, baseService, apiServiceBaseUri, authRequestHandler;

        // Load our api.users module
        beforeEach(angular.mock.module('SdpApp'));

        // Set our injected Users factory (_Users_) to our local Users variable
        beforeEach(inject(function (_$httpBackend_, _baseService_, _apiServiceBaseUri_) {
            $httpBackend = _$httpBackend_;
            // $state = _$state_;
            baseService = _baseService_;
            apiServiceBaseUri = _apiServiceBaseUri_;
            $httpBackend.whenGET(/.*html.*/).respond();
            $httpBackend.whenGET(/.*json.*/).respond();
        }));

        describe('_describe', function () {
            var entityName, serviceName, entityService, entity2Service, entity, entity2, formData;

            beforeEach(function () {
                entityName = 'entity';
                serviceName = 'service';
                entityService = function () {
                    baseService.call(this, serviceName, entityName);
                };
                entity2Service = function () {
                    baseService.call(this, serviceName, entityName, '/v1/');
                };

                entityService.prototype = new baseService();
                entity2Service.prototype = new baseService();

                entity = new entityService();
                entity2 = new entity2Service();

                formData = {
                    'key': 'value'
                };
            });

            it('new', function () {
                entity.new(formData, '#form').then(function (response) {
                    expect(response.data.id).toEqual(5);
                });

                formData.id = 5;

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/' + serviceName + '/' + entityName);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('new_error', function () {
                entity.new(formData, '#form').then(function (response) {
                    expect(response.data.id).toEqual(5);
                });

                formData.id = 5;

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/' + serviceName + '/' + entityName);
                authRequestHandler.respond(400, formData);

                $httpBackend.flush();
            });

            it('new_queryString', function () {
                entity.new(formData, '#form', {q1: 'v1', q2: 'v2'}).then(function (response) {
                    expect(response.data.id).toEqual(5);
                });

                formData.id = 5;

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenPOST(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '?q1=v1&q2=v2&');
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('update', function () {
                formData.id = 5;

                entity.update(formData, '#form').then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenPUT(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('update_error', function () {
                formData.id = 5;

                entity.update(formData, '#form').then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenPUT(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(400, formData);

                $httpBackend.flush();
            });

            it('delete', function () {
                formData.id = 5;

                entity.delete(formData.id, '#form').then(function (response) {
                    expect(response.data).toEqual(formData);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenDELETE(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('delete_error', function () {
                formData.id = 5;

                entity.delete(formData.id, '#form').then(function (response) {
                    expect(response.data).toEqual(formData);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenDELETE(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(400, formData);

                $httpBackend.flush();
            });

            it('get', function () {
                formData.id = 5;

                entity.get('#form', {q1: 'v1', q2: 'v2'}).then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '?q1=v1&q2=v2&');
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('getById', function () {
                formData.id = 5;

                entity.getById(formData.id, '#form').then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('getById_error', function () {
                formData.id = 5;

                entity.getById(formData.id, '#form').then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(400, formData);

                $httpBackend.flush();
            });

            it('getAllLocal', function () {
                formData.id = 5;

                entity.getAllLocal(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id, '#form').then(function (response) {
                    expect(response.data).toEqual(formData);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('getAllLocal', function () {
                formData.id = 5;

                entity.getAllLocal(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id, '#form').then(function (response) {
                    expect(response.data).toEqual(formData);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '/' + formData.id);
                authRequestHandler.respond(400, formData);

                $httpBackend.flush();
            });

            it('getAll', function () {
                entity.getAll('#form').then(function (response) {
                    expect(response.data).toEqual(formData);
                });

                formData.id = 5;

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('getAll_error', function () {
                entity.getAll('#form').then(function (response) {
                    expect(response.data).toEqual(formData);
                });

                formData.id = 5;

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName);
                authRequestHandler.respond(400, formData);

                $httpBackend.flush();
            });

            it('get_with_route', function () {
                formData.id = 5;

                entity2.get('#form', {q1: 'v1', q2: 'v2'}).then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName + '?q1=v1&q2=v2&');
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });

            it('get_with_undefined_urlData', function () {
                formData.id = 5;

                entity.get('#form').then(function (response) {
                    expect(response.data.id).toEqual(formData.id);
                });

                // backend definition common for all tests
                authRequestHandler = $httpBackend.whenGET(apiServiceBaseUri + '/' + serviceName + '/' + entityName);
                authRequestHandler.respond(200, formData);

                $httpBackend.flush();
            });
        });
    });
})();
