'use strict';

mrm.controller('SignoutController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

  $scope.logout = function() {
    Auth.logout().then(function() {
      $location.path('/');
    });
  };

}]);
