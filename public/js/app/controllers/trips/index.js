'use strict';

mrm.controller('TripsController', function($scope, Trip, SyncTrip) {

  $scope.trips = {};

  $scope.sync = function(trip, model, $index) {
    var trip = $scope.trips[trip._id];
    trip.seats[$index].checked = trip.seats[$index].checked ? false : true;
    SyncTrip.sync({ trip: trip }, function(res) {
      console.log(res);
    }, function(err) {
      console.log(err);
    });
  };

  Trip.query({}, function(trips) {
    angular.forEach(trips, function(value, key) {
      $scope.trips[value._id] = value;
    });
  });

});
