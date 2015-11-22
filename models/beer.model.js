var mongoose = require('mongoose');
var random = require('mongoose-random');

var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name:  String,
  abv: Number,
  price: Number,
  brewery: String,
  style: String,
  category: String
});

beerSchema.plugin(random, { path: 'r' });

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
