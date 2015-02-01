'use strict';

var app     = require('../../app')
  , User    = app.models.user
  , expect  = require('chai').expect;

describe('User', function() {

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

  it('ensure user is created', function(done) {
    expect(currentUser).not.equal(null);
    done();
  });

  it('should successfully authenticate a user by login', function(done) {
    var options = {
      email: currentUser.email,
      password: 'userTestPassword'
    };
    User.authenticate(options, function(err, user) {
      if (err) { return done(err); }
      expect(user.email).to.equal(currentUser.email);
      done();
    });
  });

  it('should successfully authenticate a user by email', function(done){
     var options = {
      email: currentUser.email,
      password: 'userTestPassword'
    };
    User.authenticate(options, function(err, user) {
      if (err) { return done(err); }
      expect(user.email).to.equal(currentUser.email);
      done();
    });
  });

  it('should successfully register a user', function(done) {
     var options = {
      name: 'new-name',
      email: 'new@email.com',
      password: 'new-password'
    };
    User.register(options, function(err, user) {
      if (err) { return done(err); }
      expect(user.email).to.equal(options.email);
      expect(user.password).not.to.equal('new-password');
      done();
    });
  });

  it('should not register a user with invalid email', function(done) {
    var options = {
      name: 'new-name',
      email: 'new_invalid_email.com',
      password: 'new-password'
    };
    User.register(options, function(err, user) {
      expect(err.errors.email).not.to.equal(null);
      done();
    });
  });

  it('should not register a user with invalid password');

});
