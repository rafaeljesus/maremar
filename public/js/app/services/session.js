'use strict';

mrm.factory('Session', function($resource) {
  return $resource('/session/');
});
