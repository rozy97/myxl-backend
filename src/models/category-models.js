const conn = require('../configs/db-config');

const categoryModels = {
    getAllCategories: () => {
        return new Promise((resolve, reject) => {
            result = conn().collection('category').find().toArray();
            resolve(result);
        })
    },

    getCategoryByID: (id) => {
        return new Promise((resolve, reject) => {
            result = conn().collection('category').find({id:id}).toArray();
            resolve(result);
        })
    },

    getAllSubCategories: (categoryID) => {
        return new Promise((resolve, reject) => {
            const  tmp = conn().collection('category').find({id:categoryID}).toArray()
            .then(result => {
                return result[0];
            })
            .then(result => {
                resolve(result.subcategories);
            })
        })
    },

    getSubCategory: (categoryID, subcategoryID) => {
        return new Promise((resolve, reject) => {
            tmp = conn().collection('category').find({id:categoryID}).toArray()
            .then(result => {
                return result[0];
            })
            .then(result => [
                result.subcategories.map(subcategory => {
                    if(subcategoryID == subcategory.id){
                        resolve(subcategory);
                    }
                })
            ])
        })
    }
}

module.exports = categoryModels;