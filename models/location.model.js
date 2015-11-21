var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name: String,

  links: {
    google: Schema.Types.Mixed
  },

  location: {
    type: [Number],
    index: {
      type: '2dsphere'
    }
  }

  // beers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Beer'
  // }]
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
