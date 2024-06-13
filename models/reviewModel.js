const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 0,
  },
  content: {
    type: String,
    max: 500,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
