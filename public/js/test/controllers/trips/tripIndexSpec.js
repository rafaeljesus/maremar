var expect = chai.expect;

describe('TripsControllerSpec', function() {

  var controller, rootScope, scope, location, http, sessionStorage;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_, $sessionStorage) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    location = $location;
    http = _$httpBackend_;
    sessionStorage = $sessionStorage;
    controller = $controller('TripsController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('should find all trips of current date', function(done) {
    var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } }
    , trips = [{
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
    var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } }
    , trips = [{
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
    var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } }
    , trip = {
        _id: 12345678,
        vehicle: vehicle._id,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        seats: [{ checked: false }]
      };
    scope.trips[trip._id] = trip;
    scope.sync(trip, 0);
    done();
  });

});
