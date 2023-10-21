const express = require('express');
const Car = require('../models/car');
const router = express.Router();

router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch all cars' });
  }
});

module.exports = router;
