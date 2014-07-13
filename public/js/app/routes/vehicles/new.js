'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/veiculos/novo', {
    templateUrl: '/templates/vehicles/new.html',
    controller: 'NewVehicleController'
  });

});
