const CarRentalRequest = require('../models/carRental.model');

exports.createRequest = async (req, res) => {
  try {
    const { carId } = req.params
    const userId = req.user._id

    const newRequest = new CarRentalRequest({ user: userId, car: carId });
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating car rental request' });
  }
};
