var express  = require('express');
var router   = express.Router();
var dbConfig = require('../config/database.config');
var mongoose = require('mongoose');
var Beer     = require('../models/beer.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  return Beer.find({}, function (error, beers) {
    if (error) {
      return console.error("Could not query beers.", error);
    } else {
      return res.send(beers);
    }
  })
});

router.get('/typeahead', function (req, res, next) {
  var brewery = req.query.brewery;
  var beer = req.query.beer;
  var name = req.query.name;

  var regex = RegExp(name, 'i');

  var search = {$or:[ {'name': { $regex: regex }}, {'brewery': { $regex: regex }}]};

  if (brewery) {
    regex = RegExp(brewery, 'i');
    search = {brewery: { $regex: regex }};
  }

  if (beer) {
    regex = RegExp(beer, 'i');
    search = {name: { $regex: regex }};
  }

  return Beer.find(search, function (error, beers) {
    if (error) {
      return console.error("Could not query beers.", error);
    } else {
      return res.send(beers);
    }
  })
});

module.exports = router;
