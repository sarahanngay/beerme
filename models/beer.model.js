var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name:  String,
  abv: Number,
  price: Number,
  brewery: String,
  style: String,
  category: String
});

var Beer = mongoose.model('Beer', beerSchema);

module.export = Beer;


