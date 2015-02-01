'use strict';

module.exports = function(app) {

  var auth = app.controllers.authentication;

  app.post('/session', auth.authenticate);
  app.delete('/session', auth.logout);
  app.post('/users', auth.register);
  app.put('/users/:id', auth.changePassword);
};
