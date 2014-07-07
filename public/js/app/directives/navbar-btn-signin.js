mrm.directive('navbarBtnSignin', function($compile) {

  var template = '<a class="btn btn-embossed btn-primary" href="/entrar"><span class="glyphicon glyphicon-log-in"></span> Entrar</a>';

  return {
    restrict: 'AE',
    template: template,
    link: function(scope, el, attrs) {
      scope.$on('user:loggedIn', function() {
        el.remove();
      });
      scope.$on('user:logout', function() {
        el.html(template);
        $compile(el.html())(scope);
      });
    }
  };
});
