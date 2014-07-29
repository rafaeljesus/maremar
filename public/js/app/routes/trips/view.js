'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/passeios/:id', {
    templateUrl: '/templates/trips/view.html',
    controller: 'ViewTripController'
  });

});
