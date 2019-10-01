const express = require("express");
const router = express.Router();

const transactionControllers = require("../controllers/transaction-controllers");

router
  .get("/", transactionControllers.getAllTransaction)
  .get("/:number", transactionControllers.getUserTransaction)
  .get("/:month", transactionControllers.getTransactionByMonth)
  .post("/:number", transactionControllers.newTransaction);

module.exports = router;
