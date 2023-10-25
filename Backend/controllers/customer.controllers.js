const User = require("../models/user.model");

exports.viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.removeCustomer = async (req, res) => {
  try {
    const { userId } = req.params;

    const customer = await User.findById(userId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.deleteOne();

    res.status(200).json({ message: "Customer removed from the system" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error removing customer from the system" });
  }
};
