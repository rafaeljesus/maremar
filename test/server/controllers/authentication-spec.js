'use strict';

var app       = require('../../../app')
  , expect    = require('chai').expect
  , request   = require('supertest')(app)
  , User      = app.models.user;

describe('Auth Controller', function() {

  var currentUser;

  beforeEach(function(done) {
    var options = {
      name: 'userTest',
      password: 'userTestPassword',
      email: 'valid@email.com'
    };
    User.register(options, function(err, user) {
      if (err) { return done(err); }
      currentUser = user;
      done();
    });
  });

  afterEach(function(done) {
    User.remove(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('when user is valid then authenticate', function(done) {
    var options = { user: { email: currentUser.email, password: 'userTestPassword' } };
    request
      .post('/session')
      .set('Accept', 'application/json')
      .send(options)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.name).to.equal('userTest');
        done();
      });
  });

  it('when user is valid then register', function(done) {
    var options = {
      user: {
        name: 'User Test First Name',
        email: 'somevalid@email.com',
        password: 'valid-password'
      }
    };
    request
      .post('/users')
      .set('Accept', 'application/json')
      .send(options)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.body.name).to.equal('User Test First Name');
        done();
      });
  });

  it('should change a existing password', function(done) {
    var options = {
      user: {
        id: currentUser.id,
        password: 'new-password'
      }
    };
    request
      .put('/users/' + currentUser.id)
      .set('Accept', 'application/json')
      .send(options)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('when user is logged in then logout', function(done) {
    request
      .delete('/session/')
      .set('Accept', 'application/json')
      .send({ user: { id: currentUser.id }})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        expect(res.status).to.equal(200);
        done();
      });
  });

});
