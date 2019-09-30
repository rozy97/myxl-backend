const conn = require("../configs/db-config");

const userModels = {
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      result = conn().collection('users').find().toArray();

      resolve(result);
    })
  },

  getUser: number => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
        .find({ number: number })
        .toArray();

      resolve(result);
    });
  },

  setBalance: (number, amount) => {
    return new Promise((resolve, reject) => {
      result = conn().collection('users').updateOne({number:number}, {$set:{balance:amount}})

      resolve(result);
    })
  }
};

module.exports = userModels;
