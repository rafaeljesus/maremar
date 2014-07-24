var app = require('../../app')
  , Trip = app.models.trip
  , Vehicle = app.models.vehicle
  , expect = require('chai').expect
  ;

describe('Trip', function() {

  var trip = null, vehicle = null;

  beforeEach(function(done) {
    var photoPath = 'public/bower_components/flat-ui/images/exaple-image.jpg';
    var options = { photo: photoPath, name: 'jippe', driver: 'driver 1', capacity: 12 };
    Vehicle.create(options, function(err, doc) {
      if (err) return done(err);
      vehicle = doc;
      var options = { vehicle: vehicle, startTime: new Date(), endTime: new Date() };
      Trip.create(options, function(err, doc) {
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

  it('should successfully associate a vehicle to a trip', function(done) {
    Trip
      .findOne({ _id: trip._id })
      .populate('vehicle')
      .exec(function(err, doc) {
        if (err) return done(err);
        console.log(doc);
        expect(doc.vehicle.name).to.not.equal(undefined);
        done();
    });
  });

});
