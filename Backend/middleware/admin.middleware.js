const jwt = require("jsonwebtoken");
const { unauthorizedResponse } = require("../utils/api.response.js");

exports.authenticateAdmin = function (req, res, next) {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return unauthorizedResponse("Access denied! You must be logged in", res);
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.role !== "admin") {
      return unauthorizedResponse("Access denied! You must be an admin to use this route!", res);
    }

    req.user = decoded;
    next();
  } catch (ex) {
    return unauthorizedResponse("Invalid token!", res);
  }
};
