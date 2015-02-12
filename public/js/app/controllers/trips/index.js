'use strict';

mrm.controller('TripsController', ['$scope', '$sessionStorage', 'Trip', 'SyncTrip', function($scope, $sessionStorage, Trip, SyncTrip) {

  $scope.trips = {};
  $scope.criteria = {};

  $scope.sync = function(trip, $index) {
    var trip = $scope.trips[trip._id];
    trip.seats[$index].checked = trip.seats[$index].checked ? false : true;
    trip.lastSyncBy = {
      name: $sessionStorage.currentUser.name,
      email: $sessionStorage.currentUser.email
    };
    var options = { trip: trip, elementId: trip._id + '-' + $index };
    SyncTrip.emit('sync-client', options);
  };

  // FIXME when server emits once, clients receives twice
  $scope.$on('socket:sync-server', function(event, options) {
    if ($scope.isTripsEmpty()) return;
    var trip = options.trip, elementId = options.elementId;
    $scope.trips[trip._id].lastSyncBy = trip.lastSyncBy;
    $scope.trips[trip._id].updatedAt = moment(trip.updatedAt).format('h:mm:ss a');
    angular.forEach($scope.trips[trip._id].seats, function(value, key) {
      value.checked = trip.seats[key].checked;
    });
    var seat = trip.seats[elementId.split('-')[1]];
    $('#' + elementId).checkbox(seat.checked ? 'check' : 'uncheck');
  });

  $scope.search = function() {
    Trip.query(query(), function(trips) {
      if (trips.length == 0) return $scope.trips = {};
      angular.forEach(trips, function(value, key) {
        value.updatedAt = moment(value.updatedAt).format('h:mm:ss a');
        $scope.trips[value._id] = value;
      });
      renderCheckbox();
    });
  };

  $scope.isTripsEmpty = function() {
    return $.isEmptyObject($scope.trips);
  };

  var renderCheckbox = function() {
    setTimeout(function() {
      $(':checkbox').checkbox();
    }, 1000);
  };

  var query = function() {
    if (!$scope.criteria.createdAt) return {};
    return {
      createdAt: new DateSerializer().toServer($scope.criteria.createdAt)
    }
  };

  setTimeout(function() {
    $('[data-toggle="tooltip"]').tooltip();
  }, 1000);

}]);
