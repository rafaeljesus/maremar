'use strict';

mrm.controller('NewVehicleController', function($scope, $location, $rootScope) {

  $scope.uploadComplete = function(vehicle) {
    $location.path('/veiculos/' + vehicle._id);
  };

});
