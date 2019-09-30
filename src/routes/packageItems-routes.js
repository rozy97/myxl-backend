const express = require("express");
const router = express.Router();

const packageItemsController = require("../controllers/packageItems-controller");

router
  .get("/", packageItemsController.getAllPackageItems)
  .get("/:id", packageItemsController.getPackageItem)
  .post("/", packageItemsController.addPackageItem)
  .patch("/:id", packageItemsController.editPackageItem)
  .delete("/:id", packageItemsController.deletePackageItem);

module.exports = router;
