const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const stockSchema = new Schema({
  sid:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('stock', stockSchema);