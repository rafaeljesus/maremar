module.exports = function(app) {

  var db = require('../../lib/db_connect')()
  , Schema = require('mongoose').Schema
  ;

  var Trip = Schema({
    vehicle: {
      _id: Schema.Types.ObjectId,
      filename: String,
      name: String,
      driver: String,
      capacity: Number
    }
    , seats: [{ checked: Boolean, _id: false }]
    , startTime: String
    , endTime: String
    , createdAt: Date
    , updatedAt: Date
  });

  Trip.statics.sync = function(trip, cb) {
    return this.findByIdAndUpdate(trip._id, { $set: { 'seats': trip.seats } }, function(err, doc) {
      if (err) return cb(err);
      cb(null, doc);
    });
  };

  Trip.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    if (this.seats.length == 0) {
      for (var i = 0; i < this.vehicle.capacity; ++i) {
        this.seats.push({ checked: false });
      }
    }
    next();
  });

  return db.model('trips', Trip);

};
