'use strict';

mrm.factory('Trip', function Trip($resource) {

  return $resource('/trips/:id', {
    id: '@id'
  }, {
    update: { method: 'PUT' },
    get: {
      method: 'GET',
      params: { id: 'me' }
    }
  });
});
