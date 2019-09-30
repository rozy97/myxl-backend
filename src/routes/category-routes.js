const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category-controllers');

router
    .get('/', categoryController.getAllCategories)
    .get('/:id', categoryController.getCategoryByID)
    .get('/sub/:categoryID', categoryController.getAllSubCategories)
    .get('/sub/:categoryID/:subCategoryID', categoryController.getSubCategory)

module.exports = router;