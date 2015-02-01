/*jshint -W030 */

'use strict';

var app       = require('../../app')
  , expect    = require('chai').expect
  , async     = require('async')
  , Trip      = app.models.trip
  , Vehicle   = app.models.vehicle;

describe('Trip', function() {

  var trip;

  beforeEach(function(done) {
    async.seq(function(next) {
      var newVehicle = {
        picture: { filename: 'exaple-image.jpg', contentType: 'image/jpg' },
        name: 'jippe',
        driver: 'driver 1',
        capacity: 12
      };
      Vehicle.create(newVehicle, function(err, doc) {
        expect(err).to.be.null;
        next(null, doc);
      });
    }, function(vehicle) {
      var newTrip = {
        vehicle: { _id: vehicle._id, name: vehicle.name, driver: vehicle.driver, capacity: vehicle.capacity },
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        lastSyncBy: { name: 'userTest', email: 'userTestEmail' }
      };
      Trip.create(newTrip, function(err, doc) {
        expect(err).to.be.null;
        trip = doc;
        done();
      });
    })();
  });

  afterEach(function(done) {
    async.series([function(next) {
      Vehicle.remove(function(err) {
        expect(err).to.be.null;
        next();
      });
    }, function(next) {
      Trip.remove(function(err) {
        expect(err).to.be.null;
        next();
      });
    }], function() {
      done();
    });
  });

  it('ensure trip is created', function(done) {
    expect(trip).to.not.equal(null);
    expect(trip.seats.length).to.be.equal(12);
    done();
  });

  it('should successfully embed vehicle to a trip', function(done) {
    Trip.findOne({ _id: trip._id })
      .exec(function(err, doc) {
        expect(err).to.be.null;
        expect(doc.vehicle).to.be.ok;
        done();
    });
  });

  it('should find all trips with date equal today', function(done) {
    Trip.findAllOfToday(function(err, doc) {
      expect(err).to.be.null;
      expect(doc.length).to.be.equal(1);
      done();
    });
  });

  it('should find all trips between today until next week', function(done) {
    Trip.findAllOfWeek(function(err, doc) {
      expect(err).to.be.null;
      expect(doc.length).to.be.equal(1);
      done();
    });
  });

  // FIXME throws Maximum call stack size exceeded only in tests
  /*it('should successfully sync seats to all clients', function(done) {
    trip.seats[0].checked = true;
    Trip.sync(trip, function(err, doc) {
      if (err) { return done(err); }
      expect(doc.seats[0].checked).to.not.equal(trip.seats[0].checked);
      done();
    });
  });*/

});
