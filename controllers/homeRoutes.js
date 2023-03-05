//rendering homepage
const router = require("express").Router();
const { Recipe, Category, User } = require("../models");

const withAuth = require("../utils/auth");

// Define a GET route for the homepage
router.get("/", (req, res) => {
  res.render("homepage");
});

// // Define a middleware function to catch all other routes
// router.use((req, res, next) => {
//   res.status(404).send("404 Not Found");
// });

// Get all recipes
router.get("/recipes", async (req, res) => {
  console.log("GET/RECIPES");
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
