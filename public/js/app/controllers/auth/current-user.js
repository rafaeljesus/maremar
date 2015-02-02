'use strict';

mrm.controller('CurrentUserController', ['Auth', '$scope', function(Auth, $scope) {

  $scope.userLoggedIn = function() {
    return Auth.isLoggedIn();
  };

  $scope.currentUser = function() {
    return Auth.currentUser();
  };

}]);
