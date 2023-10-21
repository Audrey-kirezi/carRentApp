
const jwt = require('jsonwebtoken')

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.admin = decoded;
    next();
  });
};

module.exports = authenticateAdmin;
