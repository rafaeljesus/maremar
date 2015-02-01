var expect = chai.expect;

describe('VehiclesControllerSpec', function() {

  var controller, scope, location, http;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, _$httpBackend_) {
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    controller = $controller('VehiclesController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when page is loaded then find all vehicles', function(done) {
    var vehicles = [{
      id: 1,
      name: 'new name',
      driver: 'valid@email.com',
      capacity: 12,
      picture: { filename: 'someimage' }
    }];
    http.when('GET', '/vehicles').respond(200, vehicles);
    scope.findAll();
    http.flush();
    done();
    expect(scope.vehicles).to.not.be.equal(undefined);
  });

});
