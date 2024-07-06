const Review = require("../models/reviewModel");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const errorResponse = require("../util/errorResponse");

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create({
      authorId: req.body.authorId,
      recipeId: req.body.recipeId,
      rating: req.body.rating,
      content: req.body.content,
    });

    await Recipe.findByIdAndUpdate(req.body.recipeId, {
      $push: { reviews: newReview._id },
    });

    await User.findByIdAndUpdate(req.body.authorId, {
      $push: { reviews: newReview._id },
    });

    res.status(201).json({
      newReviewId: newReview._id,
    });
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

exports.getReviewById = async (req, res, next) => {};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: "success",
      data: reviews,
    });
  } catch (err) {}
};

exports.removeReviewById = async (req, res, next) => {
  try {
    const reviewToDelete = await Review.findByIdAndDelete(req.params.id);
    if (!reviewToDelete) {
      return errorResponse(res, 404, "No review with id " + req.params.id);
    }
    res.status(204).json({
      message: "Success",
    });
  } catch (err) {
    return errorResponse(res, 400, "Failed to delete the review");
  }
};

exports.removeAllReviewsByRecipeId = async (req, res, next) => {
  try {
    await Review.deleteMany({ recipeId: req.params.id });

    res.status(204).json({
      status: "All reviews have been deleted.",
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to delete all the reviews. Error: " + err.message
    );
  }
};
