'use strict';

mrm.factory('Auth', function Auth($location, $rootScope, $sessionStorage, Session, User) {

  return {

    register: function(user, cb) {
      var callback = cb || angular.noop;
      return User.save(user, function(user) {
          $sessionStorage.currentUser = user;
          $rootScope.$broadcast('user:loggedIn');
          return callback(user);
        },
        function(err) {
          return callback(err);
        }).$promise;
    },

    authenticate: function(user, cb) {
      var callback = cb || angular.noop;
      return Session.save(user, function(user) {
        $sessionStorage.currentUser = user;
        $rootScope.$broadcast('user:loggedIn');
        return callback();
      }, function(err) {
        return callback(err);
      }).$promise;
    },

    logout: function(cb) {
      var callback = cb || angular.noop;
      return Session.delete(function() {
          $sessionStorage.currentUser = null;
          $rootScope.$broadcast('user:logout');
          return callback();
        },
        function(err) {
          return callback(err);
        }).$promise;
    },

    changePassword: function(oldPassword, newPassword, cb) {
      var callback = cb || angular.noop
      , options = {
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      return User.update(options, function(user) {
        return callback(user);
      }, function(err) {
        return callback(err);
      }).$promise;
    },

    currentUser: function() {
      return User.get();
    },

    isLoggedIn: function() {
      var user = $sessionStorage.currentUser;
      return !!user;
    }

  };
});
