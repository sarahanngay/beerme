var express = require('express');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var _ = require('lodash');

mongoose.Promise = bluebird;

var router = express.Router();

require('../models/location.model');
var Location = mongoose.model('Location');

router.get('/', function(req, res, next) {
  var query = {};

  if (req.query.beer) {
    query.beers = {
      $in: [mongoose.Types.ObjectId(req.query.beer)]
    }
  }

  if (req.query.location) {
    var lat = Number(req.query.location.split(',')[0]);
    var lng = Number(req.query.location.split(',')[1]);
    var point = {
      type: 'Point',
      coordinates: [lat, lng]
    }

    var cmd = {
      spherical: true,
      query: query,
      distanceField: 'distance'
    };

    if (req.query.radius) {
      cmd.maxDistance = Number(req.query.radius)
    }

    Location
      .geoNear(point, cmd)
      .then(function(geoObj) {
        res.status(200).json(_.map(geoObj, function (geoObjItem) {
          var obj = geoObjItem.obj;
          obj.distance = geoObjItem.dis;
          return obj;
        }));
      });
  } else {
    Location
      .find(query)
      .populate('beers')
      .then(function(locations) {
        res.status(200).json(locations);
      });
  }
});

module.exports = router;
