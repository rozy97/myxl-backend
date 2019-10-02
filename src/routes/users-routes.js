const express = require('express');
const router = express.Router();
const userController = require('../controllers/users-controllers');

const multerUploads = require('../middleware/multer').multerUploads;

router
    .get('/', userController.getAllUsers)
    .get('/:number', userController.getUser)
    .post('/topup/:number', userController.topUp)
    .post('/login/:number', userController.login)
    .post('/sharebalance/:number', userController.shareBalance)
    .post('/buypackage/:number', userController.buyPackage)
    .delete('/unsubscribe/:number', userController.removePackage)

    .patch('/photo/:number', multerUploads, userController.editPhoto)
    .patch('/profile/:number',  userController.editProfile)

module.exports = router;