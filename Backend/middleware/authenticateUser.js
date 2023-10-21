const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, 'your_customer_secret_key', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const user = await User.findById(decoded.customerId);

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
