const express = require("express");
const router = express.Router();

const userRouter = require("./users-routes");
const packagesRouter = require("./packages-routes");

router.use("/user", userRouter);
router.use("/packages", packagesRouter);

module.exports = router;
