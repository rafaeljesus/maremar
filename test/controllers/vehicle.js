var app = require('../../app')
, fs = require('fs')
, expect = require('chai').expect
, request = require('supertest')(app)
, Vehicle = app.models.vehicle;

describe('Vehicle Controller', function() {

  var vehicle
  , imgPath = 'public/bower_components/flat-ui/images/exaple-image.jpg'
  ;

  beforeEach(function(done) {
    var options = {
      name: 'vehicle 1',
      driver: 'driver 1',
      capacity: 1
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

  it('when vehicle is valid then create', function(done) {
    request
      .post('/vehicles')
      .field('name', vehicle.name)
      .field('driver', vehicle.driver)
      .field('capacity', vehicle.capacity)
      .attach('file', imgPath)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._id).to.not.equal(null);
        expect(res.body.picture.filename).to.not.equal(null);
        done();
      });
  });

  it('when a existing vehicle is changed then update', function(done) {
    var newCapacity = 5;
    var options = {
      vehicle: {
        name: vehicle.name,
        driver: vehicle.driver,
        capacity: newCapacity
      }
    };
    request
      .put('/vehicles/' + vehicle._id)
      .send(options)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._id).to.not.equal(null);
        expect(vehicle.capacity).to.not.equal(newCapacity);
        done();
      });
  });

});
