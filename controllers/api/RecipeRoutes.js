//creating//updating//deleting recipe for users
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");
const router = require("express").Router();

console.log("RecipeRoutes file was called!");

// Create a new recipe
router.post("/", withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a recipe by id
router.put("/:id", async (req, res) => {
  try {
    const [updatedRowsCount, updatedRows] = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Recipe not found" });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a recipe by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedRowsCount = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: "Recipe not found" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
