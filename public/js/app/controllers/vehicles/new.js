'use strict';

mrm.controller('NewVehicleController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

  $scope.uploadComplete = function(vehicle) {
    $location.path('/veiculos/' + vehicle._id);
  };

  $scope.validate = function() {
    $scope.submitted = true;
  };

}]);
