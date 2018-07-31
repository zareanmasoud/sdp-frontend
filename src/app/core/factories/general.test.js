// (function () {
//     'use strict';
//     describe('general factory', function () {
//         var $httpBackend, general, authRequestHandler;
//
//         // Load our SdpApp module
//         beforeEach(angular.mock.module('SdpApp'));
//
//         // Set our injected general factory (_generalService_) to our local general variable
//         beforeEach(inject(function (_$httpBackend_, _generalService_) {
//             $httpBackend = _$httpBackend_;
//             general = _generalService_;
//             $httpBackend.whenGET(/.*html.*/).respond();
//             $httpBackend.whenGET(/.*json.*/).respond();
//             $httpBackend.whenGET(/.*.*/).respond();
//         }));
//
//         // A simple test to verify the general service exists
//         it('should exist', function () {
//             expect(general).toBeDefined();
//         });
//
//         describe('test', function () {
//             beforeEach(function (done) {
//                 general.init();
//                 // TODO : transfer init to app controller
//
//                 var response = {
//                         "operators": [
//                             {
//                                 "name": "mci",
//                                 "description": "همراه اول",
//                                 "image": "core/assets/images/operators/mci.png",
//                                 "aggregators": [
//                                     {
//                                         "name": "mobin1",
//                                         "description": "مبین وان",
//                                         "image": "core/assets/images/aggregators/mobin1.png"
//                                     },
//                                     {
//                                         "name": "pardis",
//                                         "description": "پردیس",
//                                         "image": "core/assets/images/aggregators/pardis.png"
//                                     },
//                                     {
//                                         "name": "hamrah",
//                                         "description": "همراه وس",
//                                         "image": "core/assets/images/aggregators/hamrahvas.png"
//                                     },
//                                     {
//                                         "name": "dorsa",
//                                         "description": "درسا",
//                                         "image": "core/assets/images/aggregators/dorsa.png"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "name": "mtn",
//                                 "description": "ایرانسل",
//                                 "image": "core/assets/images/operators/mtn.png",
//                                 "aggregators": [
//                                     {
//                                         "name": "mtn",
//                                         "description": "ایرانسل",
//                                         "image": "core/assets/images/operators/mtn.png"
//                                     }
//                                 ]
//                             }
//                         ]
//                     };
//
//                 // backend definition common for all tests
//                 authRequestHandler = $httpBackend.whenGET('app/gateway/opps.json');
//                 authRequestHandler.respond(200, response);
//
//                 $httpBackend.flush();
//             });
//
//
//
//             fit('getOperatorDescription', function () {
//                 expect(general.getOperatorDescription('mci')).toEqual('همراه اول');
//             });
//         });
//     });
// })();
