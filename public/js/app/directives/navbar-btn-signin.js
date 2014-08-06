mrm.directive('navbarBtnSignin', function($compile, Auth) {

  var template = '<a class="btn btn-embossed btn-primary pull-right" href="/entrar"><span class="glyphicon glyphicon-log-in"></span> Entrar</a>';

  return {
    restrict: 'AE',
    template: template,
    link: function(scope, el, attrs) {
      el.html(template);
      $compile(el.html())(scope);
      scope.$on('user:loggedIn', function() {
        el.children().remove();
      });
      scope.$on('user:logout', function() {
        el.html(template);
        $compile(el.html())(scope);
      });
    }
  };
});
