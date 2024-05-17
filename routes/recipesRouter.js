const express = require("express");
const recipesController = require("../controllers/recipesController");
const recipeRegistrationSchema = require("../util/recipeRegistrationSchema");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const validate = require("../util/validate");

router
  .route("/")
  .get(recipesController.getRecipes)
  .post(recipeRegistrationSchema, validate, recipesController.postNewRecipe);

router
  .route("/:id")
  .get(recipesController.getSingleRecipe)
  .put(recipesController.editRecipe)
  .delete(recipesController.deleteRecipe);

module.exports = router;
