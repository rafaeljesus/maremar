mrm.directive('navbarVertical', function($compile, Auth) {

  var template =
    '<div class="col-md-2">' +
      '<h3>Real Trip</h3><br>' +
      '<a class="btn btn-embossed btn-primary btn-block" href="/passeios/novo"> Criar Passeio</a><br>' +
      '<ul class="nav nav-pills nav-stacked">' +
        '<li><a href="/passeios"><span class="fui-location"></span> Passeios</a></li>' +
        '<li><a href="/veiculos"><span class="glyphicon glyphicon-road"></span> Veículos</a></li>' +
        '<li><a href="#"><span class="fui-lock"></span> Admin</a></li>' +
        '<li><a href="#"><span class="fui-mail"></span> Mensagens <span class="navbar-new">1</span></a></li>' +
      '</ul>' +
      '<div navbar-btn-signin></div>' +
      '<br>' +
      '<div class="col-md-4">' +
        '<div ng-controller="SignoutController" ng-click="logout()">' +
          '<button class="btn btn-embossed btn-defaut" data-toggle="tooltip" data-placement="top" title="Sair"><span class="glyphicon glyphicon-log-out"></span></button>' +
        '</div>' +
      '</div>' +
      '<div class="col-md-4">' +
        '<div ng-controller="SettingsController">' +
          '<button class="btn btn-embossed btn-defaut" data-toggle="tooltip" data-placement="top" title="Configurações"><span class="glyphicon glyphicon-cog"></span></button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var initFlatuiWrapers = function() {
    setTimeout(function() {
      $('ul.nav-pills li a').click(function (e) {
        $('ul.nav-pills li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
      $('.nav-tabs').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });
    }, 500);
  };

  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, el, attrs) {
      scope.$on('user:loggedIn', function() {
        el.html(template);
        $compile(el.html())(scope);
        initFlatuiWrapers();
      });
      scope.$on('user:logout', function() {
        el.children().remove();
      });
    }
  };
});
