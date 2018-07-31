// (function () {
//     'use strict';
//
//     angular.module('SdpApp').factory('notificationService', ['$log', 'authService', 'toastr', 'websocketServiceBaseUri', 'debug', function ($log, authService, toastr, websocketServiceBaseUri, debug) {
// //TODO: Fix toastr error
//         var self = this;
//
//         self.ws = null;
//         self.jobs = [];
//         self.notifications = [];
//         self.observerCallbacks = [];
//         self.makeReadable = function (notification) {
//
//             var job = self.getJob(notification['correlation-id']);
//
//             if (notification.status === 'failed') {
//                 notification.color = 'label-danger';
//             }
//             else if (notification.status === 'success') {
//                 notification.color = 'label-success';
//             }
//             else {
//                 if (notification.severity === 'emergency') {
//                     notification.color = 'label-danger';
//                     notification.icon = 'fa fa-bolt';
//                 }
//                 else if (notification.severity === 'alert') {
//                     notification.color = 'label-warning';
//                     notification.icon = 'fa fa-bullhorn';
//                 }
//                 else if (notification.severity === 'critical') {
//                     notification.color = 'label-danger';
//                     notification.icon = 'fa fa-bolt';
//                 }
//                 else if (notification.severity === 'error') {
//                     notification.color = 'label-danger';
//                     notification.icon = 'fa fa-bolt';
//                 }
//                 else if (notification.severity === 'warning') {
//                     notification.color = 'label-warning';
//                     notification.icon = 'fa fa-warning';
//                 }
//                 else if (notification.severity === 'notice') {
//                     notification.color = 'label-warning';
//                     notification.icon = 'fa fa-bolt';
//                 }
//                 else if (notification.severity === 'debug') {
//                     notification.color = 'label-inverse';
//                     notification.icon = 'fa-file-code-o';
//                 }
//                 else if (notification.severity === 'info') {
//                     notification.color = 'label-info';
//                     notification.icon = 'fa fa-bell-o';
//                 }
//             }
//             if (job) {
//                 if (job.action === 'create') {
//                     notification.icon = 'icon-plus';
//                 }
//                 else if (job.action === 'delete') {
//                     notification.icon = 'fa fa-trash';
//                 }
//                 else if (job.action === 'edit') {
//                     notification.icon = 'fa fa-edit';
//                 }
//             }
//             else {
//                 notification.icon = 'fa fa-bell-o';
//             }
//         };
//         self.registerObserverCallback = function (callback) {
//             self.observerCallbacks.push(callback);
//         };
//         self.toast = function (notification) {
//             $log.debug(notification);
//             if (notification.status === 'info') {
//                 switch (notification.severity) {
//                     case 'emergency' :
//                     case 'critical' :
//                     case 'error' : {
//                         toastr.error(notification.message, 'Notification');
//                         break;
//                     }
//                     case 'alert' :
//                     case 'warning' :
//                     case 'debug' : {
//                         toastr.warning(notification.message, 'Notification');
//                         break;
//                     }
//                     case 'notice' :
//                     case 'info' : {
//                         toastr.info(notification.message, 'Notification');
//                         break;
//                     }
//                 }
//             }
//             else {
//                 switch (notification.status) {
//                     case 'success' : {
//                         toastr.success(notification.message, 'Notification');
//                         break;
//                     }
//                     case 'failed' : {
//                         toastr.error(notification.message, 'Notification');
//                         break;
//                     }
//                 }
//             }
//         };
//         self.notifyObservers = function () {
//             angular.forEach(self.observerCallbacks, function (callback) {
//                 callback();
//             });
//         };
//         self.getJob = function (correlationId) {
//             var foundJob = null;
//             self.jobs.forEach(function (job) {
//                 if (job.correlationId === correlationId) {
//                     foundJob = job;
//                     return;
//                 }
//             });
//             return foundJob;
//         };
//         self.removeJob = function (correlationId) {
//             var job = self.getJob(correlationId);
//             var i = self.jobs.indexOf(job);
//             if (i !== -1) {
//                 self.jobs.splice(i, 1);
//             }
//         };
//         self.onOpen = function () {
//             $log.debug('WebSocket connected successfully');
//         };
//         self.onClose = function () {
//             $log.debug('WebSocket disconnected !!');
//         };
//         self.markAsRead = function (notification) {
//             $log.debug(notification.id);
//             self.ws.send(JSON.stringify({
//                 'type': 'mark',
//                 'id': notification.id
//             }));
//             var index = self.notifications.indexOf(notification);
//             if (index > -1) {
//                 self.notifications.splice(index, 1);
//             }
//         };
//         self.onMessage = function (notification) {
//             notification = JSON.parse(notification);
//
//             self.makeReadable(notification);
//             self.notifications.unshift(notification);
//             self.notifyObservers();
//             self.toast(notification);
//         };
//
//
//         return {
//             login: function () {
//                 var connectionString = '';
//                 if (debug) {
//                     connectionString = websocketServiceBaseUri + 'fd';
//                 } else {
//                     connectionString = websocketServiceBaseUri + authService.authentication.token;
//                 }
//                 self.ws = new WebSocket(connectionString);
//                 self.ws.onOpen = function (env) {
//                     self.onOpen(env);
//                 };
//                 self.ws.onClose = function () {
//                     self.onClose();
//                 };
//                 self.ws.onMessage = function (event) {
//                     self.onMessage(event.data);
//                 };
//                 return;
//             },
//             logout: function () {
//                 if (self.ws) {
//                     self.ws.close();
//                 }
//                 return;
//             },
//             addJob: function (correlationId, action, parameters) {
//                 self.jobs.push({correlationId: correlationId, action: action, parameters: parameters});
//                 $log.debug(self.jobs);
//             },
//             send: function (data) {
//                 self.ws.send(JSON.stringify(data));
//             },
//             markAsRead: function (notification) {
//                 self.markAsRead(notification);
//             },
//             register: function (callback) {
//                 self.registerObserverCallback(callback);
//             },
//             notifications: self.notifications
//         };
//     }]);
// }());
