'use strict';

mrm.controller('EditVehicleController', function($scope, $location, Vehicle) {

  $scope.update = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    var options = {
      vehicle: {
        name: $scope.vehicle.name,
        driver: $scope.vehicle.driver,
        capacity: $scope.vehicle.capacity
      }
    }
    Vehicle.update(options, function(vehicle) {
      $location.path('/vehicles/' + vehicle.id);
    });
  };

});
