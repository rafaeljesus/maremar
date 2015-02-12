'use strict';

mrm.factory('Trip', function Trip($resource, $http) {

  var Trip = $resource('/trips/:id', {
    id: '@id'
  }, {
    update: { method: 'PUT' },
    get: { method: 'GET', params: { id: 'me' } },
    query: { method: 'GET', isArray: true, url: '/trips/search' }
  });

  return Trip;

});
