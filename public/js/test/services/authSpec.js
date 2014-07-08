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
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when user is valid then register', function(done) {
    var options = { name: 'valid name', email: 'valid@gmail.com', password: '123456' };
    http.when('POST', '/users').respond(options);
    http.expectPOST('/users').respond(200, options);
    auth.register(options, function(user) {
      expect(sessionStorage.currentUser).to.not.be.an('undefined');
      expect(sessionStorage.currentUser.name).to.equal(options.name);
      expect(auth.isLoggedIn()).to.be.true;
      done();
    });
    http.flush();
  });

  it('when a user is valid then authenticate', function(done){
    var options = { email: 'valid@gmail.com', password: '123456' };
    http.when('POST', '/session').respond(options);
    http.expectPOST('/session').respond(200, options);
    auth.authenticate(options, function() {
      expect(sessionStorage.currentUser).to.not.be.an('undefined');
      expect(sessionStorage.currentUser.name).to.equal(options.name);
      expect(auth.isLoggedIn()).to.be.true;
      done();
    });
    http.flush();
  });

  it('when a user is logged in then logout', function(done){
    var options = { name: 'valid name', email: 'valid@gmail.com', password: '123456' };
    http.when('POST', '/session').respond(options);
    http.expectPOST('/session').respond(200, options);
    http.when('DELETE', '/session').respond(200);
    http.expectDELETE('/session').respond(200);
    auth.authenticate(options, function(err, user) {
      auth.logout(function() {
        expect(auth.isLoggedIn()).to.be.false;
        done();
      })
    });
    http.flush();
  });

  it('when user enters a new password then change it', function(done) {
    var expectedUser = { name: 'valid name', email: 'valid@gmail.com', password: '654321' }
    , oldPassword = '123456'
    , newPassword = expectedUser.password;
    http.when('PUT', '/users').respond(expectedUser);
    http.expectPUT('/users').respond(200, expectedUser);
    auth.changePassword(oldPassword, newPassword, function(user) {
      expect(user).to.not.be.an('undefined');
      expect(user.password).to.be.equal(expectedUser.password);
      done();
    });
    http.flush();
  });

});
