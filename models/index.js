const User = require("./user");
const Recipe = require("./recipe");
const Category = require("./category");

User.hasMany(Recipe, { foreignKey: "user_id", onDelete: "CASCADE" });

Recipe.belongsTo(User, { foreignKey: "user_id" });

Recipe.belongsTo(Category, { foreignKey: "category_id" });

Category.hasMany(Recipe, { foreignKey: "category_id" });

module.exports = { User, Recipe, Category };
