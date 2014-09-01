'use strict';

var mrm = angular
  .module('mrm', [
    'ngResource',
    'ngRoute',
    'ngStorage',
    'ngUpload',
    'ui.select2',
    'btford.socket-io'
  ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/entrar');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  }]);
