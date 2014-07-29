'use strict';

mrm.controller('NewTripController', function($scope, Trip, Vehicle, $location) {

  $scope.vehicles = {};

  $scope.create = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    $scope.trip.vehicle = $scope.vehicles[$scope.trip.vehicle];
    var trip = new Trip({ trip: $scope.trip });
    trip.$save().then(function(trip) {
      $location.path('/passeios');
    }).catch(function(err) {
      err = err.data;
    });
  };

  $scope.allVehicles = function() {
    Vehicle.query({}, function(vehicles) {
      angular.forEach(vehicles, function(value, key) {
        $scope.vehicles[value._id] = {
          _id: value._id,
          name: value.name,
          driver: value.driver,
          capacity: value.capacity
        };
      });
    });
  };

});
