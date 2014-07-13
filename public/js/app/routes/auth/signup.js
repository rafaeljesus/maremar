'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/cadastrar', {
    templateUrl: '/templates/auth/signup.html',
    controller: 'SignupController',
    authenticate: true
  });

});
