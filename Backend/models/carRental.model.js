const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carRentalRequestSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', 
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },

});

const CarRentalRequest = mongoose.model('CarRentalRequest', carRentalRequestSchema);

module.exports = CarRentalRequest;
