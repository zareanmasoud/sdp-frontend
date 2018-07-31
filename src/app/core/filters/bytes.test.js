(function () {
    'use strict';
    describe('bytes_filters', function () {
        var $filter, $httpBackend;

        // Load our api.users module
        beforeEach(angular.mock.module('SdpApp'));

        // Set our injected Users factory (_Users_) to our local Users variable
        beforeEach(inject(function (_$httpBackend_, _$filter_) {
            $httpBackend = _$httpBackend_;
            $filter = _$filter_;
            $httpBackend.whenGET(/.*html.*/).respond();
            $httpBackend.whenGET(/.*json.*/).respond();
        }));

        describe('test_describe', function () {
            it('bytes', function () {
                var bytes = $filter('bytes');
                expect(bytes(1024, 1)).toEqual('1.0 KB');
            });

            it('bytes_isNan', function () {
                var bytes = $filter('bytes');
                expect(bytes(null, 1)).toEqual('-');
            });

            it('bytes_precision_undefined', function () {
                var bytes = $filter('bytes');
                expect(bytes(1024, undefined)).toEqual('1.0 KB');
            });
        });
    });
})();
