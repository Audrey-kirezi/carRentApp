
const User= require("../models/user.model")
exports.viewCustomers = (authenticateAdmin, async (req, res) => {
    try {
      const customers = await User.find();
      res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching customer data' });
    }
  })
  exports.removeCustomer=( authenticateAdmin, async (req, res) => {
    try {
      const { customerId } = req.params;
      const customer = await User.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      await customer.deleteOne();
  
      res.status(200).json({ message: 'Customer removed from the database' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error removing customer from the database' });
    }
  })