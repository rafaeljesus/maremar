'use strict';

mrm.controller('VehiclesController', function($scope, Vehicle) {

  $scope.findAll = function() {
    Vehicle.query({}, function(vehicles) {
      angular.forEach(vehicles, function(value, key) {
        value.imgUrl = 'http://localhost:3000/vehicles/image/' + value.picture.filename;
      });
      $scope.vehicles = vehicles;
    });
  };

});
