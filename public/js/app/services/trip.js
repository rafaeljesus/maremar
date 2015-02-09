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

  return Trip;

});
