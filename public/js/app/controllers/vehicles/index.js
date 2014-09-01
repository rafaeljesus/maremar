'use strict';

mrm.controller('VehiclesController', ['$scope', 'Vehicle', function($scope, Vehicle) {

  Vehicle.query({}, function(vehicles) {
    angular.forEach(vehicles, function(value, key) {
      value.imgUrl = 'http://localhost:3000/vehicles/image/' + value.picture.filename;
    });
    $scope.vehicles = vehicles;
  });

}]);
