const Ingredient = require("../models/ingredientModel");
const Recipe = require("../models/recipeModel");
const errorResponse = require("../util/errorResponse");

exports.getIngredientsByRecipeId = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "_id" } = req.query;

    const recipe = await Recipe.findById(req.params.id).populate({
      path: "ingredients.ingredient",
      model: Ingredient,
      options: {
        limit: limit * 1,
        skip: (page - 1) * limit,
        sort,
      },
    });

    if (!recipe) {
      return res.status(404).json({
        status: "Failed",
        message: "Recipe not found",
      });
    }

    const ingredients = recipe.ingredients.map((i) => i.ingredient);

    res.status(200).json({
      status: "success",
      page,
      limit,
      sort,
      data: { ingredients },
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to get the ingredients. Error: " + err.message
    );
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json({
      status: "Ingredient successfully created",
      newIngredient,
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to create the recipe. Error: " + err.message
    );
  }
};

exports.getAllIngredients = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "_id" } = req.params;
    const ingredients = await Ingredient.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);
    res.status(200).json({
      status: "success",
      page,
      limit,
      sort,
      data: { ingredients },
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to get the ingredients. Error: " + err.message
    );
  }
};

exports.deleteAllIngredients = async (req, res, next) => {
  try {
    const deletedResponse = await Ingredient.deleteMany();
    if (deletedResponse.deletedCount === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No ingredients found to delete",
      });
    }
    res.status(204).json({
      status: "All ingredients deleted successfully",
    });
  } catch (err) {
    return errorResponse(
      res,
      400,
      "Failed to delete all the ingredients. Error: " + err.message
    );
  }
};

exports.getIngredientById = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({
        status: "Failed",
        message: "Ingredient not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: ingredient,
    });
  } catch (err) {
    return errorResponse(res, 400, "Failed to get the ingredient.");
  }
};
