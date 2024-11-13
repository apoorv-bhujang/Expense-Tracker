const express = require('express');
const path = require('path');
const router = express.Router();

const basePath = require('../util/path');
const productsController = require('../controllers/products')
const budgetController = require('../controllers/budget')


router.post('/search-expense', productsController.postSearch);
router.get('/search', productsController.getSearch);

router.get('/budget', budgetController.getAddBudget);
router.post('/add-budget', budgetController.postAddBudget);

router.get('/edit-budget/:budgetId', budgetController.getEditBudget);
router.post('/edit-budget', budgetController.postEditBudget);

router.post('/delete-budget', budgetController.postDeleteBudget);

router.get('/', productsController.getProducts);

module.exports = router;