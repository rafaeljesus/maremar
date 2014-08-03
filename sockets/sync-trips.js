module.exports = function(io) {

  var sockets = io.sockets
    , mongoose = require('mongoose')
    , Trip = mongoose.model('trips')
    ;

  sockets.on('connection', function (client) {
    client.on('sync-client', function(options) {
      Trip.sync(options.trip, function(err, doc) {
        io.emit('sync-server', { trip: doc, elementId: options.elementId });
      });
    });
  });

};
