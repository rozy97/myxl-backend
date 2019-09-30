const express = require("express");
const router = express.Router();

const packageItemsController = require("../controllers/packageItems-controller");

router
  .get("/", packageItemsController.getAllPackageItems)
  .get("/:id", packageItemsController.getPackageItemById);
// .post()
// .put()
// .delete()

module.exports = router;
