'use strict';

mrm.factory('User', function($resource) {

  return $resource('/users/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT',
      params: {}
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
});
