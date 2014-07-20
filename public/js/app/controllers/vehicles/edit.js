'use strict';

mrm.controller('EditVehicleController', function($scope, $routeParams, $location, Vehicle) {

  $scope.find = function() {
    Vehicle.get({ id: $routeParams.id }, function(vehicle) {
      $scope.vehicle = vehicle;
      $scope.vehicle.imgUrl = 'http://localhost:3000/vehicles/image/' + $scope.vehicle.picture.filename;
    });
  };

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
    Vehicle.update({ id: $routeParams.id }, options, function(vehicle) {
      $location.path('/veiculos/' + vehicle._id);
    });
  };

});
