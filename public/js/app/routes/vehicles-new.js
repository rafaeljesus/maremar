'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/vehicles/new', {
    templateUrl: '/templates/vehicles-new.html',
    controller: 'NewVehicleController'
  });

});
