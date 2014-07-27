var app = require('../../app')
  , Trip = app.models.trip
  , Vehicle = app.models.vehicle
  , expect = require('chai').expect
  ;

describe('Trip', function() {

  var trip = null;

  beforeEach(function(done) {
    var newVehicle = {
      picture: { filename: 'exaple-image.jpg', contentType: 'image/jpg' },
      name: 'jippe',
      driver: 'driver 1',
      capacity: 12
    };
    Vehicle.create(newVehicle, function(err, vehicle) {
      if (err) return done(err);
      var newTrip = {
        vehicle: { name: vehicle.name, driver: vehicle.driver, capacity: vehicle.capacity },
        startTime: new Date(),
        endTime: new Date()
      };
      Trip.create(newTrip, function(err, doc) {
        if (err) return done(err);
        trip = doc;
        done();
      });
    });
  });

  afterEach(function(done) {
    Vehicle.remove(function(err) {
      if (err) return done(err);
      Trip.remove(function(err) {
        if (err) return done(err);
        done();
      });
    });
  });

  it('ensure trip is created', function(done) {
    expect(trip).not.equal(null);
    done();
  });

  it('should successfully embed a vehicle to a trip', function(done) {
    Trip
      .findOne({ _id: trip._id })
      .exec(function(err, doc) {
        if (err) return done(err);
        expect(doc.vehicle).to.not.equal(undefined);
        done();
    });
  });

});
