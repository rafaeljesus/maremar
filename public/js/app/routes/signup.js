'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/cadastrar', {
    templateUrl: 'templates/signup.html',
    controller: 'SignupController',
    authenticate: true
  });

});
