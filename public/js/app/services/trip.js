'use strict';

mrm.factory('Trip', function Trip($resource, $http) {

  var Trip = $resource('/trips/:id', {
    id: '@id'
  }, {
    update: { method: 'PUT' },
    get: {
      method: 'GET',
      params: { id: 'me' }
    }
  });

  angular.extend(Trip.prototype, {
    findAllOfWeek: function() {
      return $http({ method: 'GET', url: '/trips/allOfWeek'});
    }
  });

  return Trip;

});
