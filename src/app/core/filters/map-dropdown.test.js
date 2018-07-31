(function () {
    'use strict';
    describe('map-dropdown_filters', function () {
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
            it('map', function () {
                var map = $filter('map');
                var obj = [
                    {
                        id: 1,
                        title: 'title1'
                    },
                    {
                        id: 2,
                        title: 'title2'
                    }
                ];

                expect(map(1, obj, 'id', 'title')).toEqual('title1');
            });

            it('maps', function () {
                var maps = $filter('maps');
                var obj = [
                    {
                        id: 1,
                        title: 'title1'
                    },
                    {
                        id: 2,
                        title: 'title2'
                    }
                ];

                expect(maps(1, obj, 'id', 'title')).toEqual('');
            });
        });
    });
})();
