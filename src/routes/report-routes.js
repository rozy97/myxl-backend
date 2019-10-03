const express = require("express");
const router = express.Router();

const reportControllers = require("../controllers/report-controllers");

router
  .get("/all", reportControllers.getAllReport)
  .get("/number/:number", reportControllers.getUserReport)
  .post("/number/:number", reportControllers.addNewReport);

module.exports = router;
