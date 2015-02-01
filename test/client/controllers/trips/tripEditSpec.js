/*jshint -W030 */

'use strict';

var expect = chai.expect;

describe('EditTripControllerSpec', function() {

  var controller, scope, location, http, routeParams;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, $routeParams, _$httpBackend_) {
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    routeParams = $routeParams;
    controller = $controller('EditTripController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when I submit new values then I successfully update trip', function(done) {
    var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } };
    var trip = {
      _id: '87654321',
      vehicle: vehicle._id,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      lastSyncBy: { name: 'userTest', email: 'user@gmail.com' }
    };
    var expectedTrip = angular.copy(trip);
    expectedTrip.lastSyncBy.name = 'New User Name';
    routeParams = trip._id;
    scope.vehicles[vehicle._id] = [vehicle];
    scope.trip = trip;
    http.when('PUT', '/trips').respond(200, expectedTrip);
    http.when('GET', '/trips').respond(200, trip);
    http.when('GET', '/vehicles').respond(200, [vehicle]);
    scope.update({ $valid: true });
    http.flush();
    done();
    expect(window.location.hash).to.be.equal('/passeios');
    expect(scope.trip._id).to.not.be.undefined;
    expect(scope.vehicles).to.not.be.empty;
  });

});
