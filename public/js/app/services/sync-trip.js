'use strict';

mrm.factory('SyncTrip', function SyncTrip($resource) {
  return $resource('/trips/sync', {}, {
    sync: { method: 'POST' }
  });
});
