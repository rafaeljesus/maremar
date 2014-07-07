'use strict';

mrm.factory('Auth', function Auth($location, $rootScope, Session, User) {

  $rootScope.currentUser;

  return {

    register: function(user, cb) {
      var callback = cb || angular.noop;
      return User.save(user, function(user) {
          $rootScope.currentUser = user;
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
        $rootScope.currentUser = user;
        $rootScope.$broadcast('user:loggedIn');
        return callback();
      }, function(err) {
        return callback(err);
      }).$promise;
    },

    logout: function(cb) {
      var callback = cb || angular.noop;
      return Session.delete(function() {
          $rootScope.currentUser = null;
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
      var user = $rootScope.currentUser;
      return !!user;
    }

  };
});
