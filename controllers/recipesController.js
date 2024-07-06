const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Ingredient = require("../models/ingredientModel");
const errorResponse = require("../util/errorResponse");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

exports.getRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "_id" } = req.query;

    const recipes = await Recipe.find()
      .populate("reviews", "rating content")
      .populate("ingredients.ingredient")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort)
      .exec();

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, description, imageUrl, author, ingredients } = req.body;

    // Creare e salvare gli ingredienti individualmente
    let ingredientDocs = [];
    for (let item of ingredients) {
      let newIngredient = new Ingredient({
        name: item.name,
        unit: item.unit,
      });
      await newIngredient.save({ session });
      ingredientDocs.push({
        ingredient: newIngredient._id,
        quantity: item.quantity,
      });
    }

    // Creare la ricetta con gli ingredienti
    let newRecipe = new Recipe({
      title,
      description,
      imageUrl,
      author,
      ingredients: ingredientDocs,
    });

    await newRecipe.save({ session });
    await User.findByIdAndUpdate(author, {
      $push: { recipes: newRecipe },
    });

    // Commit della transazione
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "Recipe successfully created",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      status: "Failed to create the recipe",
      error: err.message,
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
