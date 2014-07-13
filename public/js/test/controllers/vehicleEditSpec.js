var expect = chai.expect;

describe('EditVehicleControllerSpec', function() {

  var controller, scope, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_) {
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('EditVehicleController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when form is valid then edit a existing vehicle', function(done) {
    scope.vehicle = { id: 1, name: 'old name', driver: 'valid@email.com', capacity: 12 };
    var newVehicle = { id: 1, name: 'new name', driver: 'valid@email.com', capacity: 12 };
    http.when('PUT', '/vehicles').respond(200, newVehicle);
    http.expectPUT('/vehicles').respond(200, newVehicle);
    scope.update({ $valid: true });
    http.flush();
    done();
    expect(location.path()).to.be.equal('vehicles/' + newVehicle.id);
  });

});
