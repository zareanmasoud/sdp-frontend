(function () {
    'use strict';
    describe('nl2br_filters', function () {
        var $filter, $httpBackend;

        beforeEach(module(function ($sceProvider) {
            $sceProvider.enabled(false);
        }));

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
            it('nl2br', function () {
                var nl2br = $filter('nl2br');
                var msg = 'hello\nworld';

                expect(nl2br(msg, true)).toEqual('hello<br />' + '\n' + 'world');
            });

            it('nl2br_is_xhtml_||_true', function () {
                var nl2br = $filter('nl2br');
                var msg = 'hello\nworld';

                expect(nl2br(msg, undefined)).toEqual('hello<br />' + '\n' + 'world');
            });

            it('nl2br_br', function () {
                var nl2br = $filter('nl2br');
                var msg = 'hello\nworld';

                expect(nl2br(msg, false)).toEqual('hello<br>' + '\n' + 'world');
            });
        });
    });
})();
