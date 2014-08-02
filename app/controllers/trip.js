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
        if (err) return res.json(500, err);
        res.json(201, doc);
      });
    },
    update: function(req, res) {
      var trip = req.body.trip
      , id = req.params.id;
      Trip.findByIdAndUpdate(id, { $set: trip }, function(err, doc) {
        if (err) return res.json(500, err);
        res.json(doc);
      });
    },
    sync: function(req, res) {
      var trip = req.body.trip;
      Trip.sync(trip, function(err, doc) {
        if (err) return res.json(500, err);
        res.json(doc);
      });
    },
    show: function(req, res) {
      var id = req.params.id;
      Trip.findById(id, function(err, doc) {
        if (err) return res.json(500, err);
        res.json(doc);
      });
    },
  };

  return TripController;

};
