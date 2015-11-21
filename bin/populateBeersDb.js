var _          = require('lodash');
var fs         = require('fs');
var beers      = JSON.parse(fs.readFileSync('./beers.json'));
var breweries  = JSON.parse(fs.readFileSync('./breweries.json'));
var categories = JSON.parse(fs.readFileSync('./categories.json'));
var styles     = JSON.parse(fs.readFileSync('./styles.json'));
var mongoose   = require('mongoose');
var faker      = require('faker')
var Beer       = require('../models/beer.model');
var dbConfig   = require('../config/database.config');

mongoose.connect(dbConfig.url, function(err) {
  if (err) {
    console.error('Could not connect to MongoDB!');
    console.log(err);
  }

  _.each(beers, function (beer) {
    var brewery = _.filter(breweries, function (brew) {
      return brew.id == beer.brewery_id;
    });

    var category = _.filter(categories, function (cat) {
      return cat.id == beer.cat_id;
    });

    var style = _.filter(styles, function (stl) {
      return stl.id == beer.style_id;
    })

    var new_beer = new Beer({
      name: beer.name,
      abv: beer.abv,
      price: parseFloat(faker.commerce.price() / 100).toFixed(2),
      brewery: brewery[0].name,
      category: (category[0] || {cat_name: 'N/A'}).cat_name,
      style: (style[0] || {style_name: 'N/A'}).style_name
    });

    new_beer.save(function (error) {
      if (error) {
        console.log("error saving to db", error)
      }
    })
  });
});
