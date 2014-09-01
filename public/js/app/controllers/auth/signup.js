'use strict';

mrm.controller('SignupController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

  $scope.register = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    var options = {
      user: {
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      }
    }
    Auth.register(options).then(function() {
      $location.path('/home');
    }).catch(function(err) {
      err = err.data;
    });
  };

}]);
