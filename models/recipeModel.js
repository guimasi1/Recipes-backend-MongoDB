const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: String,
});
// const Recipe = sequelize.define(
//   "recipe",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

module.exports = mongoose.model("Recipe", recipeSchema);
