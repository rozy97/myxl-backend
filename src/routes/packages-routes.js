const express = require("express");
const router = express.Router();

const packagesControllers = require("../controllers/packages-controllers");

router
    .get("/", packagesControllers.getAllPackages)
    .get("/id/:id", packagesControllers.getPackage)
    .get('/subcategory/:categoryID/:subcategoryID', packagesControllers.getPackagesBySubcategory)
    .post('/', packagesControllers.addPackage)
    .patch('/id/:id', packagesControllers.editPackage)
    .delete('/id/:id', packagesControllers.deletePackage)
module.exports = router;
