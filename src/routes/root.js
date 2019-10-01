const express = require("express");
const router = express.Router();

const userRouter = require("./users-routes");
const packagesRouter = require("./packages-routes");
const packageItemsRouter = require("./packageItems-routes");
const categoryRouter = require("./category-routes");
const transactionRouter = require("./transaction-routes");
const adminRouter = require("./admin-routes");

router.use("/user", userRouter);
router.use("/packages", packagesRouter);
router.use("/packageitems", packageItemsRouter);
router.use("/category", categoryRouter);
router.use("/transaction", transactionRouter);
router.use("/admin", adminRouter);

module.exports = router;
