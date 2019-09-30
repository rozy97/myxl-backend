const categoriesModels = require('../models/category-models');
const formResponse = require('../helpers/form-response');

module.exports = {
    getAllCategories: (req, res) => {
        categoriesModels.getAllCategories()
        .then(result => {
            formResponse.success(res, 200, result);
        })
        .catch(error => res.json(error))
    },

    getCategoryByID: (req, res) => {
        const id = req.params.id;
        categoriesModels.getCategoryByID(id)
        .then(result => {
            formResponse.success(res, 200, result);
        })
        .catch(error => res.json(error))
    },

    getAllSubCategories: (req, res) => {
        const categoryID = req.params.categoryID;
        categoriesModels.getAllSubCategories(categoryID)
        .then(result => {
            formResponse.success(res, 200, result);
        })
        .catch(error => res.json(error))
    },

    getSubCategory: (req, res) => {
        const categoryID = req.params.categoryID;
        const subCategoryID = req.params.subCategoryID;
        categoriesModels.getSubCategory(categoryID,subCategoryID)
        .then(result => {
            formResponse.success(res, 200, result);
        })
        .catch(error => res.json(error))
    }
}
