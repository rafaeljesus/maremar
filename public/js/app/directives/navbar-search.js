mrm.directive('navbarSearch', function() {

  var template =
    '<form class="navbar-form navbar-right" action="#" role="search">' +
      '<div class="form-group">' +
        '<div class="input-group">' +
          '<input class="form-control" id="navbarInput-01" type="search" placeholder="Search">' +
          '<span class="input-group-btn">' +
            '<button type="submit" class="btn"><span class="fui-search"></span></button>' +
          '</span>' +
        '</div>' +
      '</div>' +
    '</form>';

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
