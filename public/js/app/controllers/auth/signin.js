'use strict';

mrm.controller('SigninController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

  $scope.errors;

  $scope.authenticate = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    Auth.authenticate(serializeData()).then(function() {
      $location.path('/passeios');
    }).catch(function(err) {
      $scope.errors = err.data;
    });
  };

  function serializeData() {
    return {
      user: {
        email: $scope.user.email,
        password: $scope.user.password
      }
    }
  };

}]);
