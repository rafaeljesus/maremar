var expect = chai.expect;

describe('NewVehicleControllerSpec', function() {

  var controller, scope, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_) {
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('NewVehicleController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when form is valid then create new vehicle', function(done) {
    scope.vehicle = { name: 'valid name', driver: 'valid@email.com', capacity: 12 };
    var savedVehicle = { id: 1, name: 'valid name', driver: 'valid@email.com', capacity: 12 };
    http.when('POST', '/vehicles').respond(200, savedVehicle);
    http.expectPOST('/vehicles').respond(200, savedVehicle);
    scope.create({ $valid: true });
    http.flush();
    done();
    expect(location.path()).to.be.equal('vehicles/' + savedVehicle.id);
  });

});
