const express = require('express');
const router = express.Router();

const userController = require('../controllers/users-controllers');

router
    .get('/', userController.getAllUsers)
    .get('/:number', userController.getUser)
    .post('/topup/:number', userController.topUp)
    .post('/login/:number', userController.login)
    .post('/sharebalance/:number', userController.shareBalance)
    .post('/buypackage/:number', userController.buyPackage)
    .delete('/unsubscribe/:number', userController.removePackage)

module.exports = router;