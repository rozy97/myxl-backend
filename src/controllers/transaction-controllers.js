const transactionModels = require("../models/transaction-models");
const formResponse = require("../helpers/form-response");

module.exports = {
  getAllTransaction: (req, res) => {
    transactionModels
      .getAllTransaction()
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  },
  getUserTransaction: (req, res) => {
    const number = req.params.number;
    transactionModels
      .getUserTransaction(number)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  },
  getTransactionByMonth: (req, res) => {
    const capitalize = s => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    const month = capitalize(req.params.month.substring(0, 3));

    transactionModels
      .getTransactionByMonth(req.params.month)
      .then(result => {
        formResponse.success(res, 200, result, result.length);
      })
      .catch(error => console.log(error));
  },
  newTransaction: (req, res) => {
    const number = req.params.number;
    const data = {
      number,
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      date: new Date().toDateString()
    };
    transactionModels
      .newTransaction(data)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  }
};
