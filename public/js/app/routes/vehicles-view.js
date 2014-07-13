'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/veiculos/:id', {
    templateUrl: '/templates/vehicles-view.html',
    controller: 'ViewVehicleController'
  });

});
