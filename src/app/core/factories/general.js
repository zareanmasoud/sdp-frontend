(function () {
    'use strict';

    angular.module('SdpApp').factory('generalService', [function () {

        var operators = [
            {
                'name': 'mci',
                'description': 'همراه اول',
                'image': '../../../assets/images/operators/mci.png',
                'aggregators': [
                    {
                        'name': 'mobin1',
                        'description': 'مبین وان',
                        'image': '../../../assets/images/aggregators/mobin1.png'
                    },
                    {
                        'name': 'pardis',
                        'description': 'پردیس',
                        'image': '../../../assets/images/aggregators/pardis.png'
                    },
                    {
                        'name': 'hamrah',
                        'description': 'همراه وس',
                        'image': '../../../assets/images/aggregators/hamrahvas.png'
                    },
                    {
                        'name': 'dorsa',
                        'description': 'درسا',
                        'image': '../../../assets/images/aggregators/dorsa.png'
                    }
                ]
            },
            {
                'name': 'mtn',
                'description': 'ایرانسل',
                'image': '../../../assets/images/operators/mtn.png',
                'aggregators': [
                    {
                        'name': 'mtn',
                        'description': 'ایرانسل',
                        'image': '../../../assets/images/operators/mtn.png'
                    }
                ]
            }
        ];

        return {
            getOperatorImage: function (name) {
                var res = '';
                operators.forEach(function (operator) {
                    if (operator.name === name) {
                        res = operator.image;
                    }
                }, res);
                return res;
            },
            getAggregatorImage: function (name) {
                var res = '';
                operators.forEach(function (operator) {
                    operator.aggregators.forEach(function (aggregator) {
                        if (aggregator.name === name) {
                            res = aggregator.image;
                        }
                    }, res);
                }, res);
                return res;
            },

        };
    }]);
}());
