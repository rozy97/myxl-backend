const express = require('express');
const router = express.Router();

const userController = require('../controllers/users-controllers');

router
    .get('/', userController.getAlluser)
    .get('/:number', userController.getUser)
    .post('/topUp/:number', userController.topUp)

module.exports = router;