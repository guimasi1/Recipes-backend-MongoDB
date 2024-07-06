const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

router.route("/recipe/:id").delete(reviewController.removeAllReviewsByRecipeId);

router
  .route("/:id")
  .get(reviewController.getReviewById)
  .delete(reviewController.removeReviewById);

module.exports = router;
