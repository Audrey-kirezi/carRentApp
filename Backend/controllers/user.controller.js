const { compare, genSalt, hash } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const {
  createSuccessResponse,
  errorResponse,
  serverErrorResponse,
  successResponse,
} = require("../utils/api.response.js");
const _ = require("lodash");

exports.registerAsAdmin = async (req, res) => {
  try {
    let checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return errorResponse("Email is already registered!", res);

    let user = new User(
      _.pick(req.body, ["username", "phone", "address", "email", "password"])
    );

    user.role = "admin";

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    try {
      await user.save();
      return createSuccessResponse(
        "Admin registered successfully. You can now login",
        {},
        res
      );
    } catch (ex) {
      return errorResponse(ex.message, res);
    }
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select(
      "_id role password"
    );
    if (!user) return errorResponse("Invalid email or password!", res);

    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword) return errorResponse("Invalid email or password!", res);
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT);

    return successResponse("Login successful!", { access_token: token }, res);
  } catch (ex) {
    console.log(ex);
    return serverErrorResponse(ex, res);
  }
};

exports.registerAsUser = async (req, res) => {
  try {
    let checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return errorResponse("Email is already registered!", res);

    let user = new User(
      _.pick(req.body, ["username", "phone", "address", "email", "password"])
    );

    user.role = "user";

    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    try {
      await user.save();
      return createSuccessResponse(
        "User registered successfully. You can now login",
        {},
        res
      );
    } catch (ex) {
      return errorResponse(ex.message, res);
    }
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
