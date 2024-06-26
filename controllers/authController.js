const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorResponse = require("../util/errorResponse");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      imageUrl: req.body.imageUrl,
    });
    return res.status(200).json({
      userId: newUser._id,
    });
  } catch (err) {
    return errorResponse(res, 400, "Failed to register the new user.");
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Failed",
      message: "Missing password or email",
    });
  }

  try {
    const user = await User.findOne({ email });
    const correct = await bcrypt.compare(password, user.password);
    if (!user || !correct) {
      return res.status(401).json({
        status: "Failed",
        message: "Incorrect email or password",
      });
    }
    const token = createToken(user._id);

    return res.status(200).json({
      status: "Success",
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
        role: user.role,
      },
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "An error occurred during the login process."
    );
  }
};

exports.protect = () => {};
