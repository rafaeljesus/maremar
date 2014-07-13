'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/passeios', {
    templateUrl: 'templates/trips/list.html',
    controller: 'TripsController',
  });

});
