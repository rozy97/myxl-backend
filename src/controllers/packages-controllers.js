const packagesModels = require("../models/packages-models");
const categoriesModels = require('../models/category-models');
const formResponse = require("../helpers/form-response");

module.exports = {
  getAllPackages: (req, res) => {
    packagesModels
      .getAllPackages()
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => res.json(error));
  },

  getPackage: (req, res) => {
    const id = req.params.id;
    packagesModels.getPackage(id)
    .then(result => {
      formResponse.success(res, 200, result[0])
    })
    .catch(error => {
      res.json(error)
    })
  },

  addPackage: (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const validUntil = req.body.validUntil;
    const description = req.body.description;
    const termsCondition = req.body.termsCondition;
    const category = req.body.category; // category ID
    const subCategory = req.body.subCategory; // subcategory ID of the selected category
    const packageItems = req.body.packageItems; //array of package items ID

    //what to get : packageitems by id, categoryname by category id, subcategoryname by subcategory id

  }
 
  // getPackagesByCategory: (req, res) => {
  //   packagesModels
  //     .getPackagesByCategory(category)
  //     .then()
  //     .catch();
  // },
  // getPackagesByName: (req, res) => {
  //   packagesModels
  //     .getPackagesByName(name)
  //     .then()
  //     .catch();
  // },
  // addPackages: (req, res) => {
  //   packagesModels
  //     .addPackages(data)
  //     .then()
  //     .catch();
        

  // },
  // EditPackages: (req, res) => {
  //   packagesModels
  //     .EditPackages(id, data)
  //     .then()
  //     .catch();
  // },
  // deletePackages: (req, res) => {
  //   packagesModels
  //     .detelePackages(id)
  //     .then()
  //     .catch();
  // }
};
