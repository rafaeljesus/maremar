/*jshint -W030 */

'use strict';

var app       = require('../../../app')
  , expect    = require('chai').expect
  , async     = require('async')
  , Trip      = app.models.trip;

describe('Trip', function() {

  var trips = [];

  beforeEach(function(done) {
    async.seq(function(cb) {
      var newTrip = {
        vehicle: { name: 'vehicleTest', driver: 'magrão', capacity: 12 },
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        lastSyncBy: { name: 'userTest', email: 'userTest@email.com' }
      };
      Trip.create(newTrip, function(err, doc) {
        expect(err).to.be.null;
        trips.push(doc);
        cb(null);
      });
    }, function() {
      var olderDate = new Date('Thu Jan 01 2015');
      var newTrip = {
        vehicle: { name: 'vehicleTest2', driver: 'batman', capacity: 12 },
        date: olderDate,
        startTime: olderDate,
        endTime: olderDate,
        createdAt: olderDate,
        lastSyncBy: { name: 'userTest2', email: 'userTest@email2.com' }
      };
      Trip.create(newTrip, function(err, doc) {
        expect(err).to.be.null;
        trips.push(doc);
        done();
      });
    })();
  });

  afterEach(function(done) {
    Trip.remove(function(err) {
      expect(err).to.be.null;
      trips = [];
      done();
    });
  });

  it('ensure trip is created', function(done) {
    expect(trips.length).to.be.equal(2);
    expect(trips[0].seats.length).to.be.equal(12);
    done();
  });

  it('should search by empty criteria', function(done) {
    Trip.search({}, function(err, docs) {
      expect(err).to.be.null;
      expect(docs.length).to.be.equal(1);
      done();
    });
  });

  it('should search with createdAt criteria', function(done) {
    console.log(trips[1].createdAt);
    Trip.search({ createdAt: '2015-01-01' }, function(err, doc) {
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
