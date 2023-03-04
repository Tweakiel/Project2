const { User, Recipe, Category } = require("../models");
const recipeData = require("./RecipeData.json");
const categoryData = require("./categoryData.json");
const userData = require("./userData.json");
const sequelize = require("../config/connection");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    const categories = await Category.bulkCreate(categoryData, {
      returning: true,
    });
    const recipes = await Recipe.bulkCreate(recipeData, {
      individualHooks: true,
      returning: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
