const userController = require('./controllers/users-controllers');

//node schedule
const decreaseDay = () => {
    
    const cron = require('node-schedule');
    const rule = new cron.RecurrenceRule();

    // let sec = [];
    // for(let i = 1; i <= 60; i++){
    //     sec.push(i);
    // }
    // rule.second = sec;
    // rule.second = 5;
    rule.minute = 1;// schedule on minute 1 of every hour


    cron.scheduleJob(rule, function(){
        let date = new Date();
        date.setDate(date.getDate() + 15);
        // console.log(date);
        userController.decreaseDay();
    });
    
}
module.exports = decreaseDay;