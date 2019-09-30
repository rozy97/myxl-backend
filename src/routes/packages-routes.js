const express = require("express");
const router = express.Router();

const packagesControllers = require("../controllers/packages-controllers");

router
    .get("/", packagesControllers.getAllPackages)
    .get("/id/:id", packagesControllers.getPackage)
    // .post('/', packagesControllers.addPackage)

module.exports = router;
