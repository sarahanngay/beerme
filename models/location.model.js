var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name: String,

  vicinity: String,

  links: {
    google: Schema.Types.Mixed
  },

  location: {
    type: [Number],
    index: {
      type: '2dsphere'
    }
  },

  beers: [{
    type: Schema.Types.ObjectId,
    ref: 'Beer'
  }],

  distance: Number
});

locationSchema.index({name: 1, vicinity: 1}, {unique: true});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
