const router = require('express').Router();
const indexRoutes = require('./indexRoutes');
const userRoutes = require('./userRoutes');
const RecipeRoutes = require('./recipeRoutes');
const categoryRoutes = require('./categoryRoutes');



router.use('/', indexRoutes);
router.use('/users', userRoutes);
router.use('/recipes', RecipeRoutes);
router.use('/categories', categoryRoutes);


module.expiorts = router;
