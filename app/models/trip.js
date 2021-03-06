'use strict';

module.exports = function(app) {

  var db            = require('../../lib/db-connect')()
  , Schema          = require('mongoose').Schema
  , CriteriaBuilder = require('./criteria-builder');

  var Trip = Schema({
    vehicle: {
      filename: String
      , name: String
      , driver: String
      , capacity: { type: Number, required: true }
    }
    , seats: [{ checked: Boolean, _id: false }]
    , date: Date
    , startTime: String
    , endTime: String
    , lastSyncBy: { name: String, email: String }
    , createdAt: Date
    , updatedAt: Date
  });

  Trip.statics.search = function(criteria, cb) {
    var query = CriteriaBuilder.build(criteria);
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
        this.seats.push({ checked: true });
      }
    }
    next();
  });

  return db.model('trips', Trip);

};
