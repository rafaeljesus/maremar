'use strict';

mrm.controller('ViewVehicleController', ['$scope', '$routeParams', 'Vehicle', function($scope, $routeParams, Vehicle) {

  $scope.find = function() {
    Vehicle.get({ id: $routeParams.id }, function(vehicle) {
      vehicle.createdAt = moment(vehicle.createdAt).format('MMMM Do YY');
      vehicle.updatedAt = moment(vehicle.updatedAt).format('MMMM Do YY');
      $scope.vehicle = vehicle;
      $scope.vehicle.imgUrl = 'http://localhost:3000/vehicles/image/' + vehicle.picture.filename;
    });
  };

}]);
