'use strict';

mrm.controller('NewVehicleController', function($scope, $location, Vehicle) {

  $scope.create = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    var options = {
      vehicle: {
        name: $scope.vehicle.name,
        driver: $scope.vehicle.driver,
        capacity: $scope.vehicle.capacity
      }
    }
    Vehicle.save(options, function(vehicle) {
      $location.path('/vehicles');
    });
  };

});
