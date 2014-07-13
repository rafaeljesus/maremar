'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/veiculos', {
    templateUrl: '/templates/vehicles.html',
    controller: 'VehiclesController'
  });

});
