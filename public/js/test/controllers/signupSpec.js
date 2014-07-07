var expect = chai.expect;

describe('SignupControllerSpec', function() {

  var controller, scope, auth, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, Auth) {
    auth = Auth;
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('SignupController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when login form is valid then signup', function(done) {
    scope.user = { name: 'valid name', email: 'valid@email.com', password: '123456' };
    http.when('POST', '/users').respond(scope.user);
    http.expectPOST('/users').respond(200, scope.user);
    scope.register();
    http.flush();
    done();
    expect(auth.isLoggedIn()).to.be.true;
  });

});
