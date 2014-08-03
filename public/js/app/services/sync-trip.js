'use strict';

mrm.factory('SyncTrip', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('sync-server');
  return socket;
});
