'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: '/templates/index.html',
    authenticate: true
  });

});
