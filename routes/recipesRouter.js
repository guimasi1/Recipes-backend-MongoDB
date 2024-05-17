const express = require("express");
const recipesController = require("../controllers/recipesController");
const router = express.Router();

router
  .route("/")
  .get(recipesController.getRecipes)
  .post(recipesController.postNewRecipe);

router
  .route("/:id")
  .get(recipesController.getSingleRecipe)
  .put(recipesController.editRecipe)
  .delete(recipesController.deleteRecipe);

module.exports = router;
