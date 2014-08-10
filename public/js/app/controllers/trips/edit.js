'use strict';

mrm.controller('EditTripController', function($scope, $routeParams, $location, Trip, Vehicle) {

  $scope.vehicles = {};

  $scope.update = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    $scope.trip.vehicle = $scope.vehicles[$scope.trip.vehicle._id];
    var trip = new Trip({ trip: $scope.trip });
    trip.$update({ id: $routeParams.id }).then(function(trip) {
      $location.path('/passeios');
    }).catch(function(err) {
      err = err.data;
    });
  };

  Trip.get({ id: $routeParams.id }, function(trip) {
    $('.datepicker').datepicker();
    trip.date = moment(trip.date).format('DD/MM/YYYY');
    $scope.trip = trip;
  });

  Vehicle.query({}, function(vehicles) {
    angular.forEach(vehicles, function(value, key) {
      $scope.vehicles[value._id] = {
        _id: value._id,
        name: value.name,
        driver: value.driver,
        capacity: value.capacity,
        filename: value.picture.filename
      };
    });
  });

});
