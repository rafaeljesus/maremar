/*jshint -W030 */

'use strict';

var expect = chai.expect;

describe('TripsControllerSpec', function() {

  var vehicle = { name: 'vehicleTest', driver: 'magrão', capacity: 12 }
    , controller, rootScope, scope, location, http, sessionStorage, syncTrip;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, $sessionStorage, SyncTrip) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    location = $location;
    http = _$httpBackend_;
    sessionStorage = $sessionStorage;
    syncTrip = SyncTrip;
    controller = $controller('TripsController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when search trips by criteria then return all trips', function(done) {
    http.when('GET', '/trips/search').respond(200, tripsFixture);
    scope.search();
    http.flush();
    done();
    expect(scope.isTripsEmpty()).to.beFalsy();
  });

  it('when I do book a seat then a sync command should be sent to server', function(done) {
    sessionStorage.currentUser = { name: 'userTest', email: 'email@test.com' };
    var index = 0
      , trip = {
          _id: 12345678,
          vehicle: vehicle,
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          seats: [{ checked: false }]
        };
    scope.trips[trip._id] = trip;
    var syncEvent = sinon.stub(syncTrip , 'emit');
    scope.sync(trip, index);
    done();
    expect(syncEvent).to.have.been.called;
  });

  it('when sync-server event received form then update my trips page', function(done) {
    var currentTrip = {
      _id: 12345678,
      vehicle: vehicle,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      seats: [{ checked: false }]
    };
    var newTrip = {
      _id: '12345678',
      vehicle: vehicle,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      lastSyncBy: { name: 'userTest', email: 'email@test.com' },
      seats: [{ checked: true }]
    };
    var options = { trip: newTrip, elementId: newTrip._id + '-' + 0 };
    scope.trips[currentTrip._id] = currentTrip;
    scope.$emit('socket:sync-server', options);
    done();
    expect(scope.trips[0].seats[0].checked).to.be.true;
  });

});
