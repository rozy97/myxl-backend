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
  getPackageItem: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageItems")
        .find({ id })
        .toArray();

      resolve(result);
    });
  },
  addPackageItem: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageItems")
        .insertOne(data);

      resolve(result);
    });
  },
  editPackageItem: (id, data) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageItems")
        .update({ id }, { $set: data });

      resolve(result);
    });
  },
  deletePackageItem: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageItems")
        .findOneAndDelete({ id });

      resolve(result);
    });
  }
};

module.exports = packageItemsModels;
