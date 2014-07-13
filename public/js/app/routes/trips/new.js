'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/passeios/novo', {
    templateUrl: '/templates/trips-new.html',
    controller: 'NewTripController'
  });

});
