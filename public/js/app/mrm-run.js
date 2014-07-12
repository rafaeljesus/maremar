'use strict';

mrm.run(function($rootScope, $location, Auth) {

  if (Auth.isLoggedIn()) {
    setTimeout(function() {
      $rootScope.$broadcast('user:loggedIn');
    }, 30);
  }

  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (next.onRender) {
      next.onRender();
    }
    if (!next.authenticate && !Auth.isLoggedIn()) {
      $location.path('/entrar');
    }
  });

});