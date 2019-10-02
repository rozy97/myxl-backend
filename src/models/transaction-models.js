const conn = require("../configs/db-config");

const transactionModels = {
  getAllTransaction: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transaction")
        .find()
        .toArray();
      resolve(result);
    });
  },
  getUserTransaction: number => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transaction")
        .find({ number })
        .toArray();
      resolve(result);
    });
  },
  getTransactionByMonth: month => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transaction")
        .find({ date: { $regex: month } })
        .toArray();
      resolve(result);
    });
  },
  newTransaction: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transaction")
        .insertOne(data);
      resolve(result);
    });
  }
};

module.exports = transactionModels;
