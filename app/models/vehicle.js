module.exports = function(app) {

  var db = require('../../lib/db_connect')()
  , Schema = require('mongoose').Schema
  ;

  var Vehicle = new Schema({
    picture: { filename: String, contentType: String }
    , name: { type: String, required: true }
    , driver: String
    , capacity: { type: Number, required: true }
    , createdAt: Date
    , updatedAt: Date
  });

  Vehicle.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

  return db.model('vehicles', Vehicle);

};
