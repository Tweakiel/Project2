const User = require("./user");
const recipe = require("./user");
const Category = require("./user");

User.hasMany(Recipe, { foreignKey: "user_id", onDelete: "CASCADE" });

recipe.belongsTo(User, { foreignKey: "user_id" });

Recipe.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Recipe, { foreignKey: "category_id" });

module.exports = { User, Recipe, Category };
