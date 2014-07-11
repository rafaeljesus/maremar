'use strict';

mrm.run(function($rootScope, $location, Auth) {

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

});

$(function() {

  setTimeout(function() {
    $(':checkbox').checkbox();
    $('ul.nav-pills li a').click(function (e) {
      $('ul.nav-pills li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });
  }, 100);

});
