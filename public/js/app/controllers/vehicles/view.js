'use strict';

mrm.controller('ViewVehicleController', function($scope, $routeParams, Vehicle) {

  $scope.findVehicle = function() {
    Vehicle.get({ id: $routeParams.id }, function(vehicle) {
      $scope.vehicle = vehicle;
      $scope.vehicle.imgUrl = 'http://localhost:3000/vehicles/image/' + $scope.vehicle.picture.filename;
    });
  };

});
