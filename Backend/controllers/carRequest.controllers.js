const Car = require("../models/car.model");

exports.addCar = async (req, res) => {
  try {
    const { carModel, carImageUrl, price } = req.body;
    const newCar = new Car({ carModel, carImageUrl, price });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding a new car" });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const { carModel, carImageUrl, price } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { carModel, carImageUrl, price },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating car information" });
  }
};

exports.deleteCarInfo = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await car.deleteOne();

    res.status(200).json({ message: "Car removed from the system" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing car from the system" });
  }
};

exports.viewAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cars" });
  }
};
