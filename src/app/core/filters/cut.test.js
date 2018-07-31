(function () {
    'use strict';
    describe('cut_filters', function () {
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
            it('cut', function () {
                var cut = $filter('cut');
                var value = 'hello';
                expect(cut(value, true, 3, ' ..')).toEqual('hel ..');
            });

            it('cut_!value', function () {
                var cut = $filter('cut');
                expect(cut(null, true, 3, ' ..')).toEqual('');
            });

            it('cut_!max', function () {
                var cut = $filter('cut');
                var value = 'hello';
                expect(cut(value, true, null, ' ..')).toEqual('hello');
            });

            it('cut_value.length<=max', function () {
                var cut = $filter('cut');
                var value = 'hello';
                expect(cut(value, true, 5, ' ..')).toEqual('hello');
            });

            it('cut_lastSpace!==-1', function () {
                var cut = $filter('cut');
                var value = 'hello world';
                expect(cut(value, true, 7, ' ..')).toEqual('hello ..');
            });

            it('cut_with_" …"', function () {
                var cut = $filter('cut');
                var value = 'hello';
                expect(cut(value, true, 3, null)).toEqual('hel …');
            });
        });
    });
})();
