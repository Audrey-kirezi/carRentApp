const express = require('express')
const CarRentalRequest = require('../models/carRental.model')
const authenticateUser = require('../middleware/authenticateUser')
const Car = require('../models/car.model')
const router = express.Router()

router.post('/requestRental/:carId', authenticateUser, async (req, res) => {
  try {
    const { carId } = req.params
    const customerId = req.user._id

    const car = await Car.findById(carId);

    if (!car || car.isRented) {
      return res.status(404).json({ message: 'Car not available' });
    }

    const request = new CarRentalRequest({
      user: customerId,
      car: carId,
      status: 'pending',
    });

    await request.save();
    res.status(201).json({ message: 'Car rental request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating car rental request' });
  }
});

module.exports = router;
