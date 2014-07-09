mrm.directive('navbarBtnSignout', function($compile, Auth) {

  var template = '<button class="btn btn-embossed btn-danger"><span class="glyphicon glyphicon-log-out"></span> Sair</button>';

  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, el, attrs) {
      scope.$on('user:loggedIn', function() {
        el.html(template);
        $compile(el.html())(scope);
      });
      scope.$on('user:logout', function() {
        el.remove();
      });
    }
  };
});
