'use strict';

mrm.controller('EditTripController', ['$scope', '$routeParams', '$location', 'Trip', function($scope, $routeParams, $location, Trip) {

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
    trip.date = new DateSerializer().toClient(trip.date);
    $scope.trip = trip;
  });

}]);
