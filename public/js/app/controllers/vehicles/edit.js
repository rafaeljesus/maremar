'use strict';

mrm.controller('EditVehicleController', ['$scope', '$routeParams', '$location', 'Vehicle', function($scope, $routeParams, $location, Vehicle) {

  $scope.find = function() {
    Vehicle.get({ id: $routeParams.id }, function(vehicle) {
      $scope.vehicle = vehicle;
      $scope.vehicle.imgUrl = 'http://localhost:3000/vehicles/image/' + $scope.vehicle.picture.filename;
    });
  };

  $scope.updateComplete = function(vehicle) {
    $location.path('/veiculos/' + vehicle._id);
  };

  $scope.validate = function() {
    $scope.submitted = true;
  };

}]);
