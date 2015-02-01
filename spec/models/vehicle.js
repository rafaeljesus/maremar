'use strict';

var app       = require('../../app')
  , Vehicle   = app.models.vehicle
  , expect    = require('chai').expect;

describe('Vehicle', function() {

  var vehicle;

  beforeEach(function(done) {
    var options = {
      picture: { filename: 'image-exaple.jpg', contentType: '' },
      name: 'jippe',
      driver: 'driver 1',
      capacity: 12
    };
    Vehicle.create(options, function(err, doc) {
      if (err) { return done(err); }
      vehicle = doc;
      done();
    });
  });

  afterEach(function(done) {
    Vehicle.remove(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('ensure vehicle is created', function(done) {
    expect(vehicle).not.equal(null);
    done();
  });

});