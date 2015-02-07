'use strict';

mrm.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (!next.authenticate && !Auth.isLoggedIn()) {
      $location.path('/entrar');
    }
  });

}]);
