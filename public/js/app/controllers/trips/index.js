'use strict';

mrm.controller('TripsController', function($scope, $sessionStorage, Trip, SyncTrip) {

  $scope.trips = {};

  $scope.sync = function(trip, model, $index) {
    var trip = $scope.trips[trip._id];
    trip.seats[$index].checked = trip.seats[$index].checked ? false : true;
    trip.lastSyncBy = {
      name: $sessionStorage.currentUser.name,
      email: $sessionStorage.currentUser.email
    };
    SyncTrip.emit('sync-client', trip);
  };

  // FIXME when server emits once, clients receives twice
  $scope.$on('socket:sync-server', function(event, trip) {
    $scope.$apply(function() {
      $scope.trips[trip._id].lastSyncBy = trip.lastSyncBy;
      $scope.trips[trip._id].updatedAt = moment(trip.updatedAt).format('h:mm:ss a');
      angular.forEach($scope.trips[trip._id].seats, function(value, key) {
        value.checked = trip.seats[key].checked;
      });
    });
  });

  Trip.query({}, function(trips) {
    angular.forEach(trips, function(value, key) {
      value.updatedAt = moment(value.updatedAt).format('h:mm:ss a');
      $scope.trips[value._id] = value;
    });
  });

  setTimeout(function() {
    $(':checkbox').checkbox();
    $('[data-toggle="tooltip"]').tooltip();
  }, 500);

});
