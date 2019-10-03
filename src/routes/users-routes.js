const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controllers");

const multerUploads = require("../middleware/multer").multerUploads;

router
  .get("/", userController.getAllUsers)
  .get("/:number", userController.getUser)
  .post("/topup/:number", userController.topUp)
  .post("/login/:number", userController.login)
  .post("/sharebalance/:number", userController.shareBalance)
  .post("/buypackage/:number", userController.buyPackage)
  .post("/unsubscribe/:number", userController.removePackage)

  .patch("/photo/:number", multerUploads, userController.editPhoto)
  .patch("/profile/:number", userController.editProfile)

  .get("/otp/login/:number", userController.otpLogin)
  .post("/otp/login/:number", userController.otpVerify)

  .get('/test', () => {
    send.JSON({msg:'asd'})
  })

module.exports = router;
