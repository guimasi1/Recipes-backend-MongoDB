const express = require("express");
const isAuth = require("../authorization/isAuth");
const router = express.Router();
const ingredientsController = require("../controllers/ingredientsController");

router
  .route("/")
  .get(isAuth, ingredientsController.getAllIngredients)
  .post(isAuth, ingredientsController.createIngredient);

router
  .route("/deleteAll")
  .delete(isAuth, ingredientsController.deleteAllIngredients);

router.route("/:id").get(isAuth, ingredientsController.getIngredientById);

module.exports = router;
