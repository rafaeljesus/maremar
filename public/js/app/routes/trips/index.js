'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/passeios', {
    templateUrl: 'templates/trips/index.html',
    controller: 'TripsController',
  });

});
