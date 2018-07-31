(function () {
    'use strict';

    angular.module('SdpApp').factory('uiHandler', [function () {
        return {
            startLoading: function (element) {
                Metronic.blockUI({
                    target: element,
                    animate: true
                });
            },

            stopLoading: function (element) {
                Metronic.unblockUI(element);
            }
        };
    }]);
}());
