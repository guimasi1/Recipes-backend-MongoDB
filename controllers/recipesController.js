const recipeModel = require("../models/recipeModel");
const Recipe = require("../models/recipeModel");
const errorResponse = require("../util/errorResponse");

exports.getRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "_id" } = req.query;

    const recipes = await Recipe.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);
    res.status(200).json({
      status: "success",
      page,
      limit,
      items: recipes.length,
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
      status: "Recipe successfully edited",
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

exports.deleteAllRecipes = async (req, res, next) => {
  try {
    const deletedResponse = await Recipe.deleteMany();
    if (deletedResponse.deletedCount === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No recipes found to delete",
      });
    }
    res.status(204).json({
      status: "All recipes deleted successfully",
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to delete all the recipes. Error: " + err.message
    );
  }
};
