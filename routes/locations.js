var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

require('../models/location.model');
var Location = mongoose.model('Location');

router.get('/', function(req, res, next) {
  Location.find({}, function (error, locations) {
    if (error) {
      res.status(500).json({
        message: 'Could not find any locations',
        error: error
      })
    } else {
      res.status(200).json(locations);
    }
  })
});

module.exports = router;
