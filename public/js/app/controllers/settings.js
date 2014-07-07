'use strict';

mrm.controller('SettingsController', function($scope, Auth) {
  $scope.errors = {};

  $scope.changePassword = function() {
    Auth
      .changePassword($scope.user.oldPassword, $scope.user.newPassword )
      .then(function(user) {
        $scope.user = user;
        $scope.message = 'Password successfully changed.';
      }).catch(function() {
        form.password.$setValidity('mongoose', false);
        $scope.errors.other = 'Incorrect password';
      });
  };
});
