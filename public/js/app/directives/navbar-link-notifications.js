mrm.directive('navbarLinkNotifications', function($compile, Auth) {

  var template = '<a href="#fakelink"><span class="fui-mail"></span> Notificações<span class="navbar-new">1</span></a>';

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
