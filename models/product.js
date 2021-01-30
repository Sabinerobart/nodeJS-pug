const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String, // Types are not required for MongoDB, but can still choose to use them
    required: true // Can be set to required to prevent futures mistakes
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema); // Set the schema's name
