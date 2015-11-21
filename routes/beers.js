var express    = require('express');
var router     = express.Router();
var dbConfig   = require('../config/database.config');
var mongoose   = require('mongoose');
var Beer       = require('../models/beer.model');
var _          = require('lodash');
var fs         = require('fs');
var categories = JSON.parse(fs.readFileSync('./categories.json'));
var styles     = JSON.parse(fs.readFileSync('./styles.json'));

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
  var cat  = req.query.category;

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

  if (cat) {
    regex = RegExp(cat, 'i');
    search = {category: { $regex: regex }};
  }

  return Beer.find(search, function (error, beers) {
    if (error) {
      return console.error("Could not query beers.", error);
    } else {
      return res.send(beers);
    }
  })
});

router.get('/categories', function (req, res, next) {
  var category_ar = _.map(categories, function (category) {
    return category.cat_name;
  })

  return res.send(category_ar);
});

router.get('/styles', function (req, res, next) {
  var styles_ar = _.map(styles, function (style) {
    return style.style_name;
  })

  return res.send(styles_ar);
});

module.exports = router;
