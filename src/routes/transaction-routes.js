const express = require("express");
const router = express.Router();

const transactionControllers = require("../controllers/transaction-controllers");

router
  .get("/all", transactionControllers.getAllTransaction)
  .get("/:number", transactionControllers.getUserTransaction)
  .get("/month/:month", transactionControllers.getTransactionByMonth)
  .post("/:number", transactionControllers.newTransaction);

module.exports = router;
