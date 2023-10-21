const Admin = require("../models/admin.model");
const Car = require("../models/car.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateAdmin = require("../middleware/authenticateAdmin");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering admin" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ email: admin.email, _id: admin._id }, "Aud@12", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during authentication" });
  }
};
exports.addCar =
  (authenticateAdmin,
  async (req, res) => {
    try {
      const { email, carModel, carImageUrl, price } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const car = new Car({ carModel, carImageUrl, price });
      admin.cars.push(car);
      await admin.save();
      await car.save();

      res.status(201).json({ message: "Car added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding car" });
    }
  });

exports.updateCarInfo =
  (authenticateAdmin,
  async (req, res) => {
    try {
      const { carId } = req.params;
      const { carModel, carImageUrl, price } = req.body;

      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      car.carModel = carModel;
      car.carImageUrl = carImageUrl;
      car.price = price;

      await car.save();

      res.status(200).json({ message: "Car information updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating car information" });
    }
  });

exports.deleteCarInfo =
  (authenticateAdmin,
  async (req, res) => {
    try {
      const { carId } = req.params;

      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      const admin = await Admin.findOne({ email: req.admin.email });
      admin.cars.pull(car);

      await car.remove();
      await admin.save();

      res.status(200).json({ message: "Car removed from the system" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error removing car from the system" });
    }
  });
