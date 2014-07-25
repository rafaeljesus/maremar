'use strict';

mrm.controller('NewTripController', function($scope, Trip, Vehicle, $location) {

  $scope.create = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    var trip = new Trip({ trip: $scope.trip });
    trip.$save().then(function(trip) {
      $location.path('/trips/' + trip._id);
    }).catch(function(err) {
      err = err.data;
    });
  };

  $scope.allVehicles = function() {
    Vehicle.query({}, function(vehicles) {
      $scope.vehicles = vehicles;
    });
  };

});
