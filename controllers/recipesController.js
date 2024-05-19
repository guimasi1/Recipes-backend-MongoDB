const Recipe = require("../models/recipeModel");
const errorResponse = require("../util/errorResponse");

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      data: {
        recipes,
      },
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to get the recipes. Error: " + err.message
    );
  }
};

exports.getSingleRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: recipe,
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to get the recipe. Error: " + err.message
    );
  }
};

exports.postNewRecipe = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      status: "Recipe successfully created",
      newRecipe,
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to create the recipe. Error: " + err.message
    );
  }
};

exports.editRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "Reciped successfully edited",
      recipe: updatedRecipe,
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to edit the recipe. Error: " + err.message
    );
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const deleted = await Recipe.findByIdAndDelete(recipeId);
    if (!deleted) {
      res.status(404).json({
        status: "Not found",
        message: "No recipe found with id: " + recipeId,
      });
    }

    res.status(204).json({
      status: "Recipe with id: " + recipeId + " deleted",
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to delete the recipe. Error: " + err.message
    );
  }
};

exports.getRecipesByUserId = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ author: req.params.id }).exec();
    res.status(200).json({
      data: {
        recipes,
      },
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to get the recipes. Error: " + err.message
    );
  }
};
