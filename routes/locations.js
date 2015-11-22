var express = require('express');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;

var router = express.Router();

require('../models/location.model');
var Location = mongoose.model('Location');

router.get('/', function(req, res, next) {
  var query = {};

  if (req.query.beer) {
    query.beers = { $in: [req.query.beer] }
  }

  Location
    .find(query)
    .populate('beers')
    .then(function(locations) {
      res.status(200).json(locations);
    });
});

module.exports = router;
