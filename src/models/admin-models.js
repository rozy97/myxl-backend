const conn = require("../configs/db-config");

module.exports = {
  register: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("admin")
        .insertOne(data);
      resolve(result);
    });
  },
  login: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("admin")
        .find(data)
        .toArray();
      resolve(result);
    });
  }
};
