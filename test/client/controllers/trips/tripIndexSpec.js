/*jshint -W030 */

'use strict';

var expect = chai.expect;

describe('TripsControllerSpec', function() {

  var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } }
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

  it('should find all trips of current date', function(done) {
    var trips = [{
      vehicle: vehicle._id,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      lastSyncBy: { name: 'userTest', email: 'userTestEmail' }
    }];
    http.when('GET', '/trips').respond(200, trips);
    scope.findAllOfToday();
    http.flush();
    done();
    expect(scope.isTripsEmpty()).to.be(false);
  });

  it('should find all trips between current date until next week', function(done) {
    var trips = [{
      vehicle: vehicle._id,
      date: moment().add('d', 7),
      startTime: new Date(),
      endTime: new Date(),
      lastSyncBy: { name: 'userTest', email: 'userTestEmail' }
    }];
    http.when('GET', '/trips/allOfWeek').respond(200, trips);
    scope.findAllOfWeek();
    http.flush();
    done();
    expect(scope.isTripsEmpty()).to.be(false);
  });

  it('when I do book a seat then a sync command should be sent to server', function(done) {
    sessionStorage.currentUser = { name: 'userTest', email: 'email@test.com' };
    var index = 0
      , trip = {
          _id: 12345678,
          vehicle: vehicle._id,
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
      vehicle: vehicle._id,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      seats: [{ checked: false }]
    };
    var newTrip = {
      _id: '12345678',
      vehicle: vehicle._id,
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
