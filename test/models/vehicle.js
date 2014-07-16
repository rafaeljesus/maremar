var app = require('../../app')
, fs = require('fs')
, Vehicle = app.models.vehicle
, expect = require('chai').expect;

describe('Vehicle', function() {

  var vehicle = null, photoPath = 'public/bower_components/flat-ui/images/exaple-image.jpg';

  beforeEach(function(done) {
    var options = {
      photo: photoPath,
      name: 'jippe',
      driver: 'driver 1',
      capacity: 12
    };
    Vehicle.create(options, function(err, doc) {
      if (err) return done(err);
      vehicle = doc;
      done();
    });
  });

  afterEach(function(done) {
    Vehicle.remove(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('ensure vehicle is created', function(done) {
    expect(vehicle).not.equal(null);
    done();
  });

});
