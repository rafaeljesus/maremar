mrm.directive('navbarBtnSignout', function() {

  var template = '<a class="btn btn-embossed btn-danger" href="javascript:void(0);"><span class="glyphicon glyphicon-log-out"></span> Sair</a>';

  return {
    restrict: 'AE',
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
