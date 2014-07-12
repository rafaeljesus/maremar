mrm.directive('navbarVertical', function($compile, Auth) {

  var template =
    '<div class="col-md-2">' +
      '<ul class="nav nav-pills nav-stacked">' +
        '<li class="active"><a href="#"><span class="fui-location"></span> Passeios</a></li>' +
        '<li><a href="#"><span class="glyphicon glyphicon-road"></span> Veículos</a></li>' +
        '<li><a href="#"><span class="fui-user"></span> Perfil</a></li>' +
        '<li><a href="#"><span class="fui-lock"></span> Admin</a></li>' +
        '<li><a href="#"><span class="fui-mail"></span> Mensagens <span class="navbar-new">1</span></a></li>' +
      '</ul>' +
    '</div>';

  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, el, attrs) {
      scope.$on('user:loggedIn', function() {
        el.html(template);
        $compile(el.html())(scope);
      });
      scope.$on('user:logout', function() {
        el.children().remove();
      });
    }
  };
});
