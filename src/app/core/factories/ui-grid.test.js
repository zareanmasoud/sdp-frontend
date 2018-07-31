(function () {
    'use strict';
    describe('ui-grid_factory', function () {
        var $httpBackend, uiGridFactory;

        // Load our api.users module
        beforeEach(angular.mock.module('SdpApp'));

        // Set our injected Users factory (_Users_) to our local Users variable
        beforeEach(inject(function (_$httpBackend_, _uiGridFactory_) {
            $httpBackend = _$httpBackend_;
            uiGridFactory = _uiGridFactory_;
            $httpBackend.whenGET(/.*html.*/).respond();
            $httpBackend.whenGET(/.*json.*/).respond();
        }));

        describe('internal_describe', function () {
            it('getMapFilter', function () {
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

                expect(uiGridFactory.getMapFilter()(1, obj, 'id', 'title')).toEqual('title1');
            });

            it('getMapFilter_emptyString', function () {
                expect(uiGridFactory.getMapFilter()(1, null, 'id', 'title')).toEqual('');
            });

            it('getMapFilters', function () {
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

                expect(uiGridFactory.getMapFilters()(1, obj, 'id', 'title')).toEqual('');
            });

            it('getMapFilters_array', function () {
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

                expect(uiGridFactory.getMapFilters()([1,2], obj, 'id', 'title')).toEqual('title1,title2');
            });

            it('getMapFilters_emptyString', function () {
                expect(uiGridFactory.getMapFilters()([1,2], null, 'id', 'title')).toEqual('');
            });
        });

    });
})();
