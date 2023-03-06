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
          attributes: ["categoryName"],
        },
      ],
    });

    res.render("homepage", {
      recipes: presetRecipes.map((recipe) =>
        recipe.get({
          plain: true,
        })
      ),
      logged_in: req.session.logged_in,
    });
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

    const recipe = recipeData.get({
      plain: true,
    });

    console.log(recipe);
    res.render("specificrecipe", {
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Recipe,
        },
      ],
    });

    const user = userData.get({
      plain: true,
    });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/category", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Recipe,
    });
    res.render("category", {
      categories: categories.map((c) => c.toJSON()),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    const category = await Category.findByPk(req.params.id);
    console.log(category);
    const recipes = await Recipe.findAll({
      include: [{ model: User }],
      where: { category_id: category.id || null },
    });

    //
    console.log(recipes);

    res.render("recipeuc", {
      category,
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
