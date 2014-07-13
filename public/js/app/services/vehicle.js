'use strict';

mrm.factory('Vehicle', function($resource) {

  return $resource('/vehicles/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT',
      params: {}
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
});
