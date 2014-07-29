'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/passeios/:id/editar', {
    templateUrl: '/templates/trips/edit.html',
    controller: 'EditTripController'
  });

});
