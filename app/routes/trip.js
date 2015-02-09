'use strict';

module.exports = function(app) {

  var trip = app.controllers.trip;

  app.get('/trips', trip.index);
  app.get('/trips/search', trip.search);
  app.get('/trips/:id', trip.show);
  app.post('/trips', trip.create);
  app.put('/trips/:id', trip.update);
};
