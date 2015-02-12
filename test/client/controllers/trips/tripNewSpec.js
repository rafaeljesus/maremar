'use strict';

var expect = chai.expect;

describe('NewTripControllerSpec', function() {

  var controller, scope, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_) {
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('NewTripController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('should create a new trip', function(done) {
    scope.trip = {
      vehicle: { name: 'jippe', driver: 'driver test', capacity: 12 },
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      lastSyncBy: { name: 'userTest', email: 'userTestEmail' }
    };
    http.when('POST', '/trips').respond(200, scope.trip);
    scope.create({ $valid: true });
    http.flush();
    done();
    expect(window.location.hash).to.be.equal('/passeios');
  });

});
