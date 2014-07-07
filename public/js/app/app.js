'use strict';

var mrm = angular
  .module('mrm', ['ngResource', 'ngRoute'])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .when('/entrar', {
        templateUrl: 'templates/signin.html',
        controller: 'SigninController'
      })
      .when('/cadastrar', {
        templateUrl: 'templates/signup.html',
        controller: 'SignupController'
      })
      .when('/notifications', {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });
