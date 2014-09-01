'use strict';

mrm.controller('ViewTripController', ['$scope', '$routeParams', 'Trip', function($scope, $routeParams, Trip) {

  $scope.find = function() {
    Trip.get({ id: $routeParams.id }, function(trip) {
      $scope.trip = trip;
    });
  };

}]);
