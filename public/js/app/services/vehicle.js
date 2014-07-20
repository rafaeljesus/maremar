'use strict';

mrm.factory('Vehicle', function Vehicle($resource) {

  return $resource('/vehicles/:id', {
    id: '@id'
  }, {
    update: { method: 'PUT' },
    get: {
      method: 'GET',
      params: { id: 'me' }
    }
  });
});
