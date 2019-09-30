const express = require("express");
const router = express.Router();

const userRouter = require("./users-routes");
const packagesRouter = require("./packages-routes");
const packageItemsRouter = require("./packageItems-routes");

router.use("/user", userRouter);
router.use("/packages", packagesRouter);
router.use("/packageitems", packageItemsRouter);

module.exports = router;
