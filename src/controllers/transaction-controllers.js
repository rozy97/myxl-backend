module.exports = {
  getUserTransaction: (req, res) => {
    transactionModels
      .getUserTransaction()
      .then()
      .catch();
  },
  newTransaction: (req, res) => {
    transactionModels
      .newTransaction()
      .then()
      .catch();
  }
};
