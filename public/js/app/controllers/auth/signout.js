'use strict';

mrm.controller('SignoutController', function($scope, Auth, $location) {

  $scope.logout = function() {
    Auth.logout().then(function() {
      $location.path('/');
    });
  };

});
