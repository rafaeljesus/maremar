'use strict';

mrm.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

  if (Auth.isLoggedIn()) {
    setTimeout(function() {
      $rootScope.$broadcast('user:loggedIn');
    }, 30);
  }

  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (!next.authenticate && !Auth.isLoggedIn()) {
      $location.path('/entrar');
    }
  });

}]);
