const User = require("../models/userModel");
const errorResponse = require("../util/errorResponse");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    return errorResponse(res, 400, "Failed to get all users.");
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      imageUrl: user.imageUrl,
    });
  } catch (err) {
    return errorResponse(res, 400, "Failed to get the user.");
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const updatedUser = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "User successfully edited",
      user: updatedUser,
    });
  } catch (err) {
    return errorResponse(res, 400, "Failed to edit the user.");
  }
};
