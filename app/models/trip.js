'use strict';

module.exports = function(app) {

  var db = require('../../lib/db-connect')()
  , Schema = require('mongoose').Schema
  , moment = require('moment');

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
    var now = new moment();
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
    var query = { date: { $gte: today() } };
    return this.find(query, function(err, doc) {
      if (err) { return cb(err); }
      cb(null, doc);
    });
  };

  Trip.statics.findAllOfWeek = function(cb) {
    var query = { date: { $gte: today(), $lte: nextWeek() } };
    return this.find(query, function(err, doc) {
      if (err) { return cb(err); }
      cb(null, doc);
    });
  };

  Trip.statics.sync = function(trip, cb) {
    var mod = {
      $set: {
        'lastSyncBy': trip.lastSyncBy,
        'seats': trip.seats,
        'updatedAt': new Date()
      }
    };
    return this.findByIdAndUpdate(trip._id, mod, function(err, doc) {
      if (err) { return cb(err); }
      cb(null, doc);
    });
  };

  Trip.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    if (this.seats.length === 0) {
      for (var i = 0; i < this.vehicle.capacity; ++i) {
        this.seats.push({ checked: false });
      }
    }
    next();
  });

  return db.model('trips', Trip);

};
