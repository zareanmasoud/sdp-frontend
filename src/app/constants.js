angular.module('SdpApp.conf', [])
    .constant('websocketServiceBaseUri', 'ws://resto/ws/')
    .constant('apiServiceBaseUri', 'http://api.vsdp.staging')
    .constant('debug', true)
    .constant('test', false);
