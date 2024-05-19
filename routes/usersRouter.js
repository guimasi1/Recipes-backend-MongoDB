const express = require("express");
const userController = require("../controllers/userController");
const recipesController = require("../controllers/recipesController");
const isAuth = require("../authorization/isAuth");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(isAuth, userController.getSingleUser)
  .put(isAuth, userController.editUser)
  .delete(isAuth);

router.route("/:id/recipes").get(isAuth, recipesController.getRecipesByUserId);

module.exports = router;
