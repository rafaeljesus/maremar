module.exports = function(app) {

  var db = require('../../lib/db_connect')()
  , Schema = require('mongoose').Schema
  ;

  var Trip = Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicles' }
    , startTime: Date
    , endTime: Date
    , createdAt: Date
    , updatedAt: Date
  });

  Trip.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

  return db.model('trips', Trip);

};
