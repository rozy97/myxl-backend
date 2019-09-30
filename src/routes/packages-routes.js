const express = require("express");
const router = express.Router();

const packagesControllesrs = require("../controllers/packages-controllers");

router.get("/", packagesControllesrs.getAllPackages);

module.exports = router;
