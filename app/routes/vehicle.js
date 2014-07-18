module.exports = function(app) {

  var vehicle = app.controllers.vehicle
  ;

  app.get('/vehicles', vehicle.index);
  app.get('/vehicles/:id', vehicle.show);
  app.get('/vehicles/image/:file', vehicle.image);
  app.post('/vehicles', vehicle.create);
};
