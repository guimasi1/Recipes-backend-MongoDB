const Recipe = require("../models/recipeModel");

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      data: {
        recipes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
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
    res.status(400).json({
      status: "Failed",
      message: err,
    });
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
    res.status(400).json({
      status: "Failed",
      message: err,
    });
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
    res.status(400).json({
      status: "failed",
      message: err,
    });
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
    res.status(400).json({
      status: "Failed to delete",
      message: err,
    });
  }
};
