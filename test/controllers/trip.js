var app = require('../../app')
, fs = require('fs')
, expect = require('chai').expect
, request = require('supertest')(app)
, Trip = app.models.trip;

describe('Trip Controller', function() {

  var trip = null;

  beforeEach(function(done) {
    var newTrip = {
      vehicle: { name: 'jippe', driver: 'driver 1', capacity: 12 },
      startTime: new Date(),
      endTime: new Date()
    };
    Trip.create(newTrip, function(err, doc) {
      if (err) return done(err);
      trip = doc;
      done();
    });
  });

  afterEach(function(done) {
    Trip.remove(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('when index page then return all trips', function(done) {
    request
      .get('/trips')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]._id).to.be.equal(trip.id);
        done();
      })
  }),

  it('when trip is valid then create', function(done) {
    var options = {
      trip: {
        vehicle: { name: 'flex boat', driver: 'driver 1', capacity: 18 },
        startTime: new Date(),
        endTime: new Date()
      }
    };
    request
      .post('/trips')
      .send(options)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._id).to.not.equal(undefined);
        expect(res.body.vehicle.name).to.not.equal(undefined);
        done();
      });
  });

  it('should update a existing trip', function(done) {
    var options = {
      trip: {
        vehicle: { name: 'schooner', driver: 'driver 1', capacity: 80 }
      }
    };
    request
      .put('/trips/' + trip.id)
      .send(options)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._id).to.not.equal(undefined);
        expect(res.body.vehicle.name).to.not.equal(trip.vehicle.name)
        done();
      });
  });

  it('when view vehicle then show', function() {
    /*request
      .get('/vehicles/' + vehicle.id)
      .accept('application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(vehicle.id).not.equal(res.id);
        done();
      });*/
  });

});
