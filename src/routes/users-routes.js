const express = require('express');
const router = express.Router();
const userController = require('../controllers/users-controllers');

const multerUploads = require('../middleware/multer').multerUploads;

//node schedule
var cron = require('node-schedule');
var rule = new cron.RecurrenceRule();
let sec = [];
for(let i = 1; i <= 60; i++){
    sec.push(i);
}
rule.second = 50;
cron.scheduleJob(rule, function(){
    console.log(new Date(), 'The user second of the minute.');
});

router
    .get('/', userController.getAllUsers)
    .get('/:number', userController.getUser)
    .post('/topup/:number', userController.topUp)
    .post('/login/:number', userController.login)
    .post('/sharebalance/:number', userController.shareBalance)
    .post('/buypackage/:number', userController.buyPackage)
    .delete('/unsubscribe/:number', userController.removePackage)

    .post('/test', multerUploads, userController.test)

module.exports = router;