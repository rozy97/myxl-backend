const userController = require('./controllers/users-controllers');

//node schedule
const decreaseDay = () => {
    
    const cron = require('node-schedule');
    const rule = new cron.RecurrenceRule();

    // rule.second = [5, 15, 35, 55];
    // rule.minute = 10 ;
    rule.hour = 9;


    cron.scheduleJob(rule, function(){
        let date = new Date();
        date.setDate(date.getDate() + 15);
        // console.log(date);
        userController.decreaseDay();
    });
    
}
module.exports = decreaseDay;