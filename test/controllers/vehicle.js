var app = require('../../app')
, fs = require('fs')
, expect = require('chai').expect
, request = require('supertest')(app)
, Vehicle = app.models.vehicle;

describe('Vehicle Controller', function() {

  var imgPath = 'public/bower_components/flat-ui/images/exaple-image.jpg';

  afterEach(function(done) {
    Vehicle.remove(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('when vehicle is valid then create', function(done) {
    var vehicle = {
      name: 'vehicle 1',
      driver: 'driver 1',
      capacity: 1
    };
    request
      .post('/vehicles')
      .field('vehicle[name]', vehicle.name)
      .field('vehicle[driver]', vehicle.driver)
      .field('vehicle[capacity]', vehicle.capacity)
      .attach('photo', imgPath)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.name).to.equal(vehicle.name);
        expect(res.body.photo).to.not.equal(null);
        done();
      });
  });

});
