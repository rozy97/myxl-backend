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
  }
};

module.exports = packagesModels;
