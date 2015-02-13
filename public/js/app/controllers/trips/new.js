'use strict';

mrm.controller('NewTripController', ['$scope', 'Trip', '$location', function($scope, Trip, $location) {

  $scope.create = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    $scope.trip.date = new DateSerializer().toServer($scope.trip.date);
    var trip = new Trip({ trip: $scope.trip });
    trip.$save().then(function(trip) {
      $location.path('/passeios');
    }).catch(function(err) {
      err = err.data;
    });
  };

}]);
