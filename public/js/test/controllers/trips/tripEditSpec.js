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

  /*it('when I navigate to edit page then find trip by Id', function(done) {
    var vehicle = { _id: '12345678', name: 'jippe', driver: 'driver test', capacity: 12, picture: { filename: 'someimage' } }
    , trip = {
        _id: 12345678,
        vehicle: vehicle._id,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        lastSyncBy: { name: 'userTest', email: 'userTestEmail' }
      };
    routeParams = trip._id;
    http.when('GET', '/trips').respond(200, trip);
    
    http.flush();
    done();
    expect(scope.trip).to.no.be.equal(undefined)
  });*/

});
