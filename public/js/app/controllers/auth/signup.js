'use strict';

mrm.controller('SignupController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

  $scope.register = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    Auth.register(serializeData()).then(function() {
      $location.path('/home');
    }).catch(function(err) {
      err = err.data;
    });
  };

  var serializeData = function() {
    return {
      user: {
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      }
    }
  };

}]);
