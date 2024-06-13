const Review = require("../models/reviewModel");
const errorResponse = require("../util/errorResponse");

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create({
      recipeId: req.body.recipeId,
      rating: req.body.rating,
      content: req.body.content,
    });
    res.status(201).json({
      newReviewId: newReview._id,
    });
  } catch (err) {
    return errorResponse(res, 400);
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
