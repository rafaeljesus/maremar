module.exports = function(app) {

  var Trip = app.models.trip
  ;

  TripController = {

    index: function(req, res) {
      Trip
        .find({})
        .populate('vehicle')
        .exec(function(err, doc) {
          res.json(doc);
      });
    },

    create: function(req, res) {
      var trip = req.body.trip;
      Trip.create({}, function(err, doc) {
        if (err) return res.json(err);
        res.json(201, doc);
      });
    }

  };

  return TripController;

};
