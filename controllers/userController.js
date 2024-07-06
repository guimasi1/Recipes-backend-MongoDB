const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");
const errorResponse = require("../util/errorResponse");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("reviews")
      .populate("recipes", "title description imageUrl")
      .exec();
    res.status(200).json({
      status: "success",
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
    const user = await User.findById(id)
      .populate("reviews", "rating content")
      .exec();
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      imageUrl: user.imageUrl,
      userRecipe: user.recipe,
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
