module.exports = function(app) {

  var Trip = app.models.trip;

  TripController = {
    index: function(req, res) {
      Trip.find({}, function(err, doc) {
        res.json(doc);
      });
    },
    create: function(req, res) {
      var trip = req.body.trip;
      Trip.create(trip, function(err, doc) {
        if (err) return res.json(err);
        res.json(201, doc);
      });
    },
    update: function(req, res) {
      var trip = req.body.trip
      , id = req.params.id;
      Trip.findByIdAndUpdate(id, { $set: trip }, function(err, doc) {
        console.log(doc);
        if (err) return res.json(err);
        res.json(doc);
      });
    }
  };

  return TripController;

};
