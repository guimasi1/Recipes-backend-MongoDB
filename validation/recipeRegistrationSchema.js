const { checkSchema } = require("express-validator");

const recipeRegistrationSchema = checkSchema({
  description: {
    isLength: {
      options: { min: 10 },
      errorMessage: "Description must be at least 10 characters long",
    },
  },
  title: {
    isLength: {
      options: { min: 4 },
      errorMessage: "Title must be at least 4 characters long",
    },
  },
});

module.exports = recipeRegistrationSchema;
