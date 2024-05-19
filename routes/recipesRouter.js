const express = require("express");
const recipesController = require("../controllers/recipesController");
const recipeRegistrationSchema = require("../validation/recipeRegistrationSchema");
const router = express.Router();
const validate = require("../validation/validate");
const isAuth = require("../authorization/isAuth");

router
  .route("/")
  .get(isAuth, recipesController.getRecipes)
  .post(
    isAuth,
    recipeRegistrationSchema,
    validate,
    recipesController.postNewRecipe
  );

router
  .route("/:id")
  .get(isAuth, recipesController.getSingleRecipe)
  .put(isAuth, recipesController.editRecipe)
  .delete(isAuth, recipesController.deleteRecipe);

module.exports = router;
