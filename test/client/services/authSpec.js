/*jshint -W030 */

'use strict';

var expect = chai.expect;

describe('AuthSpec', function() {

  var auth, http, sessionStorage;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function(Auth, _$httpBackend_, $sessionStorage) {
    auth = Auth;
    http = _$httpBackend_;
    sessionStorage = $sessionStorage;
  }));

  afterEach(function() {
    http.verifyNoOutstandingRequest();
  });

  it('when user is valid then register', function(done) {
    var options = { name: 'valid name', email: 'valid@gmail.com', password: '123456' };
    http.when('POST', '/users').respond(options);
    auth.register(options, function(user) {
      expect(sessionStorage.currentUser).to.be.ok;
      expect(sessionStorage.currentUser.name).to.equal(options.name);
      expect(auth.isLoggedIn()).to.be.true;
      done();
    });
    http.flush();
  });

  it('when a user is valid then authenticate', function(done){
    var options = { email: 'valid@gmail.com', password: '123456' };
    http.when('POST', '/session').respond(options);
    auth.authenticate(options, function() {
      expect(sessionStorage.currentUser).to.be.ok;
      expect(sessionStorage.currentUser.name).to.equal(options.name);
      expect(auth.isLoggedIn()).to.be.true;
      done();
    });
    http.flush();
  });

  it('when a user is logged in then logout', function(done){
    var options = { name: 'valid name', email: 'valid@gmail.com', password: '123456' };
    http.when('POST', '/session').respond(options);
    http.when('DELETE', '/session').respond(200);
    auth.authenticate(options, function(err, user) {
      auth.logout(function() {
        expect(auth.isLoggedIn()).to.be.false;
        done();
      });
    });
    http.flush();
  });

  it('when user enters a new password then change it', function(done) {
    var expectedUser = { name: 'valid name', email: 'valid@gmail.com', password: '654321' }
    , oldPassword = '123456'
    , newPassword = expectedUser.password;
    http.when('PUT', '/users').respond(200, expectedUser);
    auth.changePassword(oldPassword, newPassword, function(user) {
      expect(user).to.be.ok;
      expect(user.password).to.be.equal(expectedUser.password);
      done();
    });
    http.flush();
  });

});
