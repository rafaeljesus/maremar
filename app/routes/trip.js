module.exports = function(app) {

  var trip = app.controllers.trip;

  app.get('/trips', trip.index);
  app.get('/trips/:id', trip.show);
  app.post('/trips', trip.create);
  app.post('/trips/sync', trip.sync);
  app.put('/trips/:id', trip.update);

};
