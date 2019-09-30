const conn = require("../configs/db-config");

const userModels = {
  getUser: number => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
        .find({ number: number })
        .toArray();

      resolve(result);
    });
  }
};

module.exports = userModels;
