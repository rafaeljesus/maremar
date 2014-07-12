'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/entrar', {
    templateUrl: '/templates/signin.html',
    controller: 'SigninController',
    authenticate: true
  });

});
