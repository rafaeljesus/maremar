'use strict';

var app       = require('../../../app')
  , expect    = require('chai').expect
  , request   = require('supertest')(app);

describe('Home Controller', function() {

  it('should render status 200 when do GET', function(done) {
    request.get('/').end(function(err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
});
