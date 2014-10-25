'use strict';

mrm.controller('SigninController', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

  $scope.authenticate = function(form) {
    $scope.submitted = true;
    if (!form.$valid) return;
    Auth.authenticate(serializeData()).then(function() {
      $location.path('/passeios');
    }).catch(function(err) {
      err = err.data;
      $scope.errors.other = err.message;
    });
  };

  var serializeData = function() {
    return {
      user: {
        email: $scope.user.email,
        password: $scope.user.password
      }
    }
  };

}]);
