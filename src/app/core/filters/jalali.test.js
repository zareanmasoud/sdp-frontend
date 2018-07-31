(function () {
    'use strict';
    describe('jalali_filters', function () {
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
            it('jalali', function () {
                var jalali = $filter('jalali');
                expect(jalali('2017-01-08T17:23:47.600323Z')).toEqual('1395/10/19 17:23');
            });

            it('jalali_different_format', function () {
                var jalali = $filter('jalali');
                expect(jalali('2017-01-08T17:23:47.600323Z', 'jMM/jYYYY/jDD HH:mm')).toEqual('10/1395/19 17:23');
            });

            it('jalali_without_inputDate', function () {
                var jalali = $filter('jalali');
                expect(jalali(null, 'jMM/jYYYY/jDD HH:mm')).toEqual('');
            });
        });
    });
})();
