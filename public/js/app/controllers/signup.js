'use strict';

mrm.controller('SignupController', function($scope, Auth, $location) {

  $scope.register = function() {
    var options = {
      user: {
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      }
    }
    Auth.register(options).then(function() {
      $location.path('/');
    }).catch(function(err) {
      err = err.data;
    });
  };

});
