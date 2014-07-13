'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/veiculos/:id/editar', {
    templateUrl: '/templates/vehicles/edit.html',
    controller: 'EditVehicleController'
  });

});
