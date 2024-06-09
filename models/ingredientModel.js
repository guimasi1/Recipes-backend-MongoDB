const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.module("Ingredient", ingredientSchema);
