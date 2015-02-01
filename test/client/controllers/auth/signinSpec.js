/*jshint -W030 */

'use strict';

var expect = chai.expect;

describe('SigninControllerSpec', function() {

  var controller, scope, auth, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, Auth) {
    auth = Auth;
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('SigninController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when login form is valid then authenticate', function(done) {
    scope.user = { user: { email: 'valid@email.com', password: '123456' } };
    http.when('POST', '/session').respond(200, scope.user);
    scope.authenticate({ $valid: true });
    http.flush();
    done();
    expect(auth.isLoggedIn()).to.be.true;
  });

});
