var expect = chai.expect;

describe('SignoutControllerSpec', function() {

  var controller, scope, auth, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, Auth) {
    auth = Auth;
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('SignoutController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when user signed in then signout', function(done) {
    http.when('DELETE', '/session').respond(200);
    http.expectDELETE('/session').respond(200);
    scope.logout();
    http.flush();
    done();
    expect(auth.isLoggedIn()).to.be.false;
  });

});
