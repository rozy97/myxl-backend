const conn = require("../configs/db-config");

const reportModels = {
  getAllreport: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("report")
        .find()
        .toArray();
      resolve(result);
    });
  },
  getUserReport: number => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("report")
        .find({ number })
        .toArray();
      resolve(result);
    });
  },
  addNewReport: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("report")
        .insertOne(data);
      resolve(result);
    });
  }
};

module.exports = reportModels;
