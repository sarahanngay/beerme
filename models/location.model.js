var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name: String,
  links: {
    google: Schema.Types.Mixed
  }
  // beers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Beer'
  // }]
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
