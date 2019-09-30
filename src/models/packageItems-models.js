const conn = require("../configs/db-config");

const packageItemsModels = {
  getAllPackageItems: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageItems")
        .find()
        .toArray();

      resolve(result);
    });
  },
  getPackageItemById: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageItems")
        .find({ id })
        .toArray();

      resolve(result);
    });
  }
};

module.exports = packageItemsModels;
