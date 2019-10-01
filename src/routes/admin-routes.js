const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controllers");

router
  .post("/register", adminControllers.register)
  .post("/login", adminControllers.login);

module.exports = router;
