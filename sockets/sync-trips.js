module.exports = function(io) {

  var sockets = io.sockets
    , mongoose = require('mongoose')
    , Trip = mongoose.model('trips')
    ;

  sockets.on('connection', function (client) {
    client.on('sync-client', function(trip) {
      Trip.sync(trip, function(err, doc) {
        io.emit('sync-server', doc);
      });
    });
  });

};
