const packagesModels = require("../models/packages-models");
const categoriesModels = require('../models/category-models');
const packageItemsModels = require('../models/packageItems-models');
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

  addPackage: async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const validUntil = req.body.validUntil;
    const description = req.body.description;
    const termsCondition = req.body.termsCondition;
    const category = req.body.category; // category ID
    const subcategory = req.body.subcategory; // subcategory ID of the selected category
    let packageItems = req.body.packageItems; //array of package items ID
    
    //what to get : packageitems by id, categoryname by category id, subcategoryname by subcategory id
    const categoryName = await categoriesModels.getCategoryByID(category)
    .then(result => {  
      return result[0].name;
    })
    
    const subcategoryName = await categoriesModels.getSubCategory(category, subcategory)
    .then(result => {  
      return result.name;
    })
    
    const items =[];
    for(let i = 0; i<packageItems.length; i++){
      let tmp = await packageItemsModels.getPackageItemById(packageItems[i])
      .then(result => {return result[0]})
      items.push(tmp)
    }
    packageItems = [...items];
    
    //create ID
    const allPackages = await packagesModels.getAllPackages()
    .then(result => {
      return result
    })
    const allPackagesID = [];
    idFront = allPackages[0].id.slice(0,3)
    
    allPackages.map(package => {
      let  id = package.id.slice(3,6)
      id = parseInt(id);
      allPackagesID.push(id)
    })
    
    max = Math.max(...allPackagesID);
    let idBack = max+1;
    let tmp = '';
    idBack += '';
  
    for(let i = 1; i <= 3 - idBack.length;i++){
      tmp+='0';
    }
    idBack = tmp + idBack ;
    const id = idFront + idBack;
    //end of create id

    const data = {
      id,
      name,
      price,
      validUntil,
      description,
      termsCondition,
      category,
      subcategory,
      packageItems,
      categoryName,
      subcategoryName
    }
    packagesModels.addPackage(data)
    .then(result => {
      formResponse.success(res, 200, data)  
    })
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
