const categoriesModels = require('../models/category-models');
const packageModels = require('../models/packages-models');
const formResponse = require('../helpers/form-response');

module.exports = {
    getAllCategories: async (req, res) => {
        const categories = await categoriesModels.getAllCategories()
        .then(result => {
            return result;
        })
        .catch(error => res.json(error))

        const tmpCategories = [];
        let count = 0;
        categories.map(async (category, index) => {
            const packages = await packageModels.getPackagesByCategory(category.id)
            .then(result => {
                return result;
            })
            .catch(error => res.json(error))
           
            category = {
                ...category,
                totalPackages:packages.length
            }
            // await tmpCategories.push(category);
            tmpCategories[index] = category;

            count++;
            if(count == categories.length){
                formResponse.success(res, 200, tmpCategories);
            }
        })
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
        const subcategoryID = req.params.subcategoryID;
        categoriesModels.getSubCategory(categoryID,subcategoryID)
        .then(result => {
            formResponse.success(res, 200, result);
        })
        .catch(error => res.json(error))
    }
}
