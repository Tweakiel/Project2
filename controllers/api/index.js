const router = require("express").Router();

const userRoutes = require("./userRoutes");
const RecipeRoutes = require("./RecipeRoutes");

router.use("/recipes", RecipeRoutes);
router.use("/users", userRoutes);

module.exports = router;
