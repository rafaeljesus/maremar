module.exports = function(app) {

  var trip = app.controllers.trip;

  app.get('/trips', trip.index);
  app.post('/trips', trip.create);
  app.put('/trips/:id', trip.update);

};
