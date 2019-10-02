const conn = require("../configs/db-config");

const packagesModels = {
  getAllPackages: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .find()
        .toArray();
      resolve(result);
    });
  },
  
  getPackage: (id) => {
    return new Promise((resolve, reject) => {
      result = conn().collection('packages').find({id:id}).toArray();
      resolve(result);
    })
  },

  getPackagesBySubcategory: (categoryID,subcategoryID) => {
    return new Promise((resolve, reject) => {
      result = conn().collection('packages').find({category:categoryID, subcategory:subcategoryID}).toArray();
      resolve(result);
    })
  },
  
  addPackage: (data) => {
    return new Promise((resolve, reject) => {
      result = conn().collection('packages').insertOne(data)
      resolve(result);
    })
  },

  editPackage: (id, data) => {
    return new Promise((resolve, reject) => {
      result = conn().collection('packages').updateOne({id:id}, {$set:data})
      resolve(result);
    })
  }
};

module.exports = packagesModels;
