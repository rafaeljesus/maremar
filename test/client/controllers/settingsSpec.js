'use strict';

var expect = chai.expect;

describe('SettingsControllerSpec', function() {

  var controller, scope, auth, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, Auth) {
    auth = Auth;
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('SettingsController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when user enters a new password then change it', function(done) {
    scope.user = { oldPassword: '123456', newPassword: '654321' };
    http.when('PUT', '/users').respond(scope.user);
    http.expectPUT('/users').respond(200, scope.user);
    scope.changePassword();
    http.flush();
    done();
    expect(scope.message).to.be.equal('Password successfully changed.');
  });

});
