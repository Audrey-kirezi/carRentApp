const jwt =require("jsonwebtoken");
const { errorResponse } =require("../utils/api.response.js");
const { verify } = jwt;

module.exports = function (req, res, next) {
    if (!req.header("auth-token"))
      return res.status(401).send("Access denied! you must be logged in");
  
    var token = req.header("auth-token").trim();
  
    if (!token)
      return res.status(401).send("Access denied! you must be logged in");
    try {
      token = token.replace("Bearer", "").trim();
      let user = verify(token, process.env.JWT.trim());
      req.user = user;
      next();
    } catch (ex) {
      console.log(ex);
      return errorResponse("Invalid token!", res);
    }
  };
