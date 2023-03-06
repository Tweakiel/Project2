//rendering homepage
const router = require("express").Router();
const { Recipe, Category, User } = require("../models");

const withAuth = require("../utils/auth");

// Define a GET route for the homepage
router.get("/", async (req, res) => {
  try {
    const presetRecipes = await Recipe.findAll({
      where: {
        id: [1, 2, 3],
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    res.render("homepage", {
      recipes: presetRecipes.map((recipe) => recipe.get({ plain: true })),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

// Get a single recipe by id
router.get("/recipes/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });

    console.log(recipe);
    res.render("specificrecipe", {
      ...recipe,
    });
    // if (!recipe) {
    //   res.status(404).json({ message: "Recipe not found" });
    // } else {
    //   res.status(200).json(recipe);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/category", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Recipe,
    });
    res.render("category", { categories: categories.map((c) => c.toJSON()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single recipe by id
router.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: "category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users", async (req, res) => {
  console.log("GET/RECIPES");
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single recipe by id
router.get("/users/:id", async (req, res) => {
  try {
    const users = await User.findByPk(req.params.id);
    if (!users) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// // Define a middleware function to catch all other routes
// router.use((req, res, next) => {
//   res.status(404).send("404 Not Found");
// });

module.exports = router;
