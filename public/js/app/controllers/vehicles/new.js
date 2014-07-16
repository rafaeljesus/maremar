'use strict';

mrm.controller('NewVehicleController', function($scope, $location, Vehicle) {

  $scope.uploadComplete = function(content) {
    console.log(content); 
  };

});
