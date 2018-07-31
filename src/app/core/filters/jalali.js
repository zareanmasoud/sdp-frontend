(function () {
    'use strict';

    angular.module('SdpApp').filter('jalali', [function () {
        return function (inputDate, format) {
            if (inputDate) {
                format = format || 'jYYYY/jMM/jDD HH:mm';
                return moment.tz(inputDate, 'YYYY-MM-DD HH:mm:ss.T ZZ', 'Asian/|Tehran').format(format);
            }
            return '';
        };
    }]);
}());
