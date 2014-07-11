'use strict';

mrm.controller('SigninController', function($scope, Auth, $location) {

  $scope.authenticate = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    var options = {
      user: {
        email: $scope.user.email,
        password: $scope.user.password
      }
    }
    Auth.authenticate(options).then(function() {
      $location.path('/home');
    }).catch(function(err) {
      err = err.data;
      $scope.errors.other = err.message;
    });
  };

});
