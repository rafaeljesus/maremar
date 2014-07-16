module.exports = function(app) {

  var vehicle = app.controllers.vehicle
  ;

  app.get('/vehicles', vehicle.index);
  app.post('/vehicles', vehicle.create);
};
