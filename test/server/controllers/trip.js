/*jshint -W030 */

'use strict';

var app       = require('../../../app')
  , expect    = require('chai').expect
  , async     = require('async')
  , request   = require('supertest')(app)
  , Trip      = app.models.trip;

describe('Trip Controller', function() {

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
      var olderDate = new Date(2015, 1, 1);
      var newTrip2 = {
        vehicle: { name: 'vehicleTest2', driver: 'batman', capacity: 12 },
        date: olderDate,
        startTime: olderDate,
        endTime: olderDate,
        createdAt: olderDate,
        lastSyncBy: { name: 'userTest2', email: 'userTest@email2.com' }
      };
      Trip.create(newTrip2, function(err, doc) {
        expect(err).to.be.null;
        trips.push(doc);
        done();
      });
    })();
  });

  afterEach(function(done) {
    Trip.remove(function(err) {
      trips = [];
      done();
    });
  });

  it('when index page then return all trips from current day', function(done) {
    request
      .get('/trips')
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).to.be.equal(2);
        done();
      });
  });

  it('when search with empty criteria then return all trips from current day', function(done) {
    request
      .get('/trips/search')
      .query({})
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).to.be.equal(1);
        done();
      });
  });

  it('when search with createdAt criteria then return trips from date range', function(done) {
    request
      .get('/trips/search')
      .query({ createdAt: trips[1].createdAt })
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.length).to.be.equal(1);
        done();
      });
  });

  it('when trip is valid then create', function(done) {
    var options = {
      trip: {
        vehicle: { name: 'vehicleTest', driver: 'magrão', capacity: 12 },
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        lastSyncBy: { name: 'userTest', email: 'userTest@email.com' }
      }
    };
    request
      .post('/trips')
      .send(options)
      .expect(201)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body._id).to.be.ok;
        done();
      });
  });

  it('should update a existing trip', function(done) {
    var options = {
      trip: {
        lastSyncBy: { name: 'newUser', email: 'newUser@email.com' }
      }
    };
    var trip = trips[0];
    request
      .put('/trips/' + trip.id)
      .send(options)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body._id).to.be.ok;
        expect(res.body.lastSyncBy.name).to.not.equal(trip.lastSyncBy.name);
        done();
      });
  });

  it('should show a trip', function(done) {
    request
      .get('/trips/' + trips[0].id)
      .accept('application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body._id).be.ok;
        done();
      });
  });

});
