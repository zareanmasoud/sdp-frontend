(function () {
    'use strict';
    describe('reverse_filters', function () {
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
            it('reverse', function () {
                var reverse = $filter('reverse');
                var items = ['foo', 'bar'];

                expect(reverse(items)).toEqual(['bar', 'foo']);
            });
        });
    });
})();
