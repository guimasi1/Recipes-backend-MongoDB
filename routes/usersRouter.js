const express = require("express");
const userController = require("../controllers/userController");
const recipesController = require("../controllers/recipesController");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .put(userController.editUser)
  .delete();

router.route("/:id/recipes").get(recipesController.getRecipesByUserId);

module.exports = router;
