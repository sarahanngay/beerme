var express  = require('express');
var router   = express.Router();
var dbConfig = require('../config/database.config');
var mongoose = require('mongoose');
var Beer     = require('../models/beer.model');

/* GET home page. */
router.get('/', function(req, res, next) {

  mongoose.connect(dbConfig.url, function(err) {
    if (err) {
      console.error('Could not connect to MongoDB!');
      console.log(err);
    }

    return Beer.find({}, function (error, beers) {
      if (error) {
        return console.error("Could not query beers.", error);
      } else {
        return res.send(beers);
      }
    })
  });
});

module.exports = router;
