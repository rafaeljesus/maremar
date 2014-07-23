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

  it('when index page then return vehicles collection', function(done) {
    request
      .get('/vehicles')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]._id).to.be.equal(vehicle.id);
        done();
      })
  }),

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
    request
      .post('/vehicles')
      .field('id', vehicle.id)
      .field('name', vehicle.name)
      .field('driver', vehicle.driver)
      .field('capacity', vehicle.capacity)
      .attach('file', imgPath)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(vehicle.capacity).to.not.equal(newCapacity);
        done();
      });
  });

  it('when view vehicle then show', function(done) {
    request
      .get('/vehicles/' + vehicle.id)
      .accept('application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(vehicle.id).not.equal(res.id);
        done();
      });
  });

  it('when image request then respond with buffer image', function(done) {
    var newPath = process.env.HOME + '/exaple-image.jpg';
    fs.rename('../fixtures/exaple-image.jpg', newPath, function(err) {
      request
        .get('/vehicles/image/' + 'exaple-image.jpg')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          fs.unlink(newPath, function(err) {
            done();
          });
        });
    });
  });

});
