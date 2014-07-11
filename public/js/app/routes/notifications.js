'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/notificacoes', {
    templateUrl: 'templates/settings.html',
    controller: 'SettingsController'
  })

});
