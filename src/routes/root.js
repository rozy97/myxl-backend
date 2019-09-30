const express = require('express');
const router = express.Router();

const userRouter = require('./users-routes');

router.use('/user', userRouter)

module.exports = router;