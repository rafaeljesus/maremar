'use strict';

module.exports = function(app) {

  var fs = require('fs')
    , formidable = require('formidable')
    , Vehicle = app.models.vehicle;

  var onFile = function(field, file) {
    if (!file) { return; }
    var newPath = process.env.HOME + '/' + file.name;
    fs.rename(file.path, newPath);
  };

  var VehicleController = {

    index: function(req, res) {
      Vehicle.find({}, function(err, vehicles) {
        res.json(vehicles);
      });
    },

    save: function(req, res) {
      var form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.uploadDir = process.env.HOME;
      form.on('file', onFile);
      form.parse(req, function(err, fields, files) {
        var vehicle = {
          name: fields.name,
          driver: fields.driver,
          capacity: fields.capacity,
          picture: {
            filename: (files.file || {}).name,
            contentType: (files.file || {}).type
          }
        };
        if (fields.id) {
          Vehicle.findById(fields.id, function(err, doc) {
            if (err) { return res.json(500, err); }
            doc.name = vehicle.name;
            doc.driver = vehicle.driver;
            doc.capacity = vehicle.capacity;
            doc.picture = vehicle.picture;
            doc.save(function(err) {
              res.json(doc);
            });
          });
        } else {
          Vehicle.create(vehicle, function(err, doc) {
            if (err) { return res.json(500, err); }
            res.json(201, doc);
          });
        }
      });
    },

    show: function(req, res) {
      var id = req.params.id;
      Vehicle.findById(id, function(err, vehicle) {
        if (err) { return res.json(err); }
        res.json(vehicle);
      });
    },

    image: function(req, res) {
      var file = req.params.file;
      fs.readFile(process.env.HOME + '/' + file, function(err, img) {
        if (err) { return res.json(err); }
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(new Buffer(img));
      });
    }
  };

  return VehicleController;

};
