var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name:  String,
  abv: Number,
  price: Number,
  brewery: {
    type: Schema.Types.ObjectId,
    ref: 'Brewery'
  },
  style: {
    type: Schema.Types.ObjectId,
    ref: 'Style'
  }
});

var Beer = mongoose.model('Beer', beerSchema);

module.export = Beer;


