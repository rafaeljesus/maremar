'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'templates/main.html',
    controller: 'MainController',
    authenticate: true
  })

});
