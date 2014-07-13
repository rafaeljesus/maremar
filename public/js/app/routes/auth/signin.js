'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/entrar', {
    templateUrl: '/templates/auth/signin.html',
    controller: 'SigninController',
    authenticate: true
  });

});
