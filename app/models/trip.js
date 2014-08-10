module.exports = function(app) {

  var db = require('../../lib/db_connect')()
  , Schema = require('mongoose').Schema
  , moment = require('moment')
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
    , date: Date
    , startTime: String
    , endTime: String
    , lastSyncBy: { name: String, email: String }
    , createdAt: Date
    , updatedAt: Date
  });

  var today = function() {
    var now = new moment()
    return toDate(now);
  };

  var nextWeek = function() {
    var nextWeek = moment().add(7, 'd');
    return toDate(nextWeek);
  };

  var toDate = function(date) {
    var year = date.year()
      , month = date.month()
      , day = date.date();
    return new Date(year, month, day);
  };

  Trip.statics.findAllOfToday = function(cb) {
    return this.find({ date: { $gte: today() } }, function(err, doc) {
      if (err) return cb(err);
      cb(null, doc);
    });
  };

  Trip.statics.findAllOfWeek = function(cb) {
    return this.find({ date: { $gte: today(), $lte: nextWeek() } }, function(err, doc) {
      if (err) return cb(err);
      cb(null, doc);
    });
  };

  Trip.statics.sync = function(trip, cb) {
    return this.findByIdAndUpdate(trip._id, {
        $set: {
          'lastSyncBy': trip.lastSyncBy,
          'seats': trip.seats,
          'updatedAt': new Date()
          }
        }, function(err, doc) {
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
