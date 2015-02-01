var expect = chai.expect;

describe('ViewVehicleControllerSpec', function() {

  var controller, scope, location, http, routeParams;

  beforeEach(function() {
    module('mrm');
  });

  beforeEach(inject(function($rootScope, $controller, $location, $routeParams, _$httpBackend_) {
    scope = $rootScope.$new();
    location = $location;
    http = _$httpBackend_;
    routeParams = $routeParams;
    controller = $controller('ViewVehicleController', {
      $scope: scope
    });
  }));

  afterEach(function() {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('when page is loaded then find vehicle by Id', function(done) {
    var vehicle = {
      id: 1,
      name: 'new name',
      driver: 'valid@email.com',
      capacity: 12,
      picture: { filename: 'someimage' }
    };
    routeParams = vehicle.id;
    http.when('GET', '/vehicles').respond(200, vehicle);
    http.expectGET('/vehicles').respond(200, vehicle);
    scope.find();
    http.flush();
    done();
    expect($scope.vehicle).to.no.be.equal(undefined);
  });

});
