const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  carModel: {
    type: String,
    required: true,
  },
  carImageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
