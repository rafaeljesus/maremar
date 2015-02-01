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
    scope.vehicles = {};
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('should create a new trip', function(done) {
    var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } };
    scope.trip = {
      vehicle: vehicle._id,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      lastSyncBy: { name: 'userTest', email: 'userTestEmail' }
    };
    scope.vehicles['12345678'] = vehicle;
    var savedTrip = angular.copy(scope.trip);
    savedTrip.id = '123456'

    http.when('POST', '/trips').respond(200, scope.trip);
    http.expectPOST('/trips').respond(200, savedTrip);
    scope.create({ $valid: true });
    http.flush();
    done();
    expect(window.location.hash).to.be.equal('/passeios');
  });

  it('when page load then find all trips', function(done) {
    var vehicles = [{
      _id: '12345678',
      name: 'new name',
      driver: 'valid@email.com',
      capacity: 12,
      picture: { filename: 'someimage' }
    }];
    http.when('GET', '/vehicles').respond(200);
    http.expectGET('/vehicles').respond(200, vehicles);
    scope.allVehicles();
    http.flush();
    done();
    expect(scope.vehicles['12345678']._id).to.be.equal('12345678');
  });

});
