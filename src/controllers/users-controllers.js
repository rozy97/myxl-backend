const userModels = require('../models/users-models');
const formResponse = require('../helpers/form-response');

module.exports = {
  login: (req, res) => {
    const number = req.params.number;
    userModels.getUser(number)
    .then(result => {
      if(result.length){
        formResponse.success(res, 200, result[0])
      } else {
        // get date now + daysUntilExpired, expirationdate = 30days from registered
        var expDate = new Date();
        expDate.setDate(expDate.getDate() + 30);
        
        const data ={
          number: number,
          name: "Welcome",
          email: "",
          photo: "",
          alternateNumber: number,
          balance: 0,
          expirationDate: expDate,
          daysUntilExpired: 30,
          totalQuota:0,
          totalCall:0,
          totalSMS:0,
          remainingQuota: 0,
          remainingCall: 0,
          remainingSMS: 0,
          packages: []
        }   

        userModels.addUser(data)
        .then(result => {
          formResponse.success(res, 200, data)
        })
        .catch(error => {
          res.json(error)
        })
      }     
    })
  },

  getAllUsers: (req, res) => {
    userModels.getAllUsers()
    .then(result => {
      formResponse.success(res, 200, result)
    })
    .catch(error => {
      res.json(error)
    })
  },

  getUser: (req, res) => { 
    const number = req.params.number;
    userModels.getUser(number)
    .then(result => {
      formResponse.success(res, 200, result[0])
    })
    .catch(error => {
      res.json(error)
    })
  },

  topUp: (req, res) => {
    const number = req.params.number;
    const amount = req.body.amount;

    userModels.getUser(number)
    .then(result => {
      return result[0].balance;
    })
    .then(result => {
      const balance = parseInt(result)+parseInt(amount);

      try {
        userModels.setBalance(number, balance)
        const data = {
          number,
          balance
        } 
        formResponse.success(res, 200, data)

      } catch (error) {
        res.json(error);
      }
    })   
    .catch(error => {
      res.json(error)
    })
  },

  shareBalance: (req, res) => {
    const number = req.params.number;
    const target = req.body.target;
    const amount = req.body.amount;

    userModels.getUser(number)
    .then(result => {
      return result[0].balance;
    })
    .then(result => {
      if(parseInt(result) <= parseInt(amount)){
        res.json({error:'Maaf, pulsa anda tidak cukup!'})
      } else {
        const balance = parseInt(result)-parseInt(amount);
        try {
          userModels.setBalance(number, balance)
        } catch (error) {
          res.json(error);
        }
        
        userModels.getUser(target)
        .then(result => {
          return result[0].balance;
        })
        .then(result => {
          const balance = parseInt(result)+parseInt(amount);
    
          try {
            userModels.setBalance(target, balance)
            const data = {
              number:target,
              balance
            } 
            formResponse.success(res, 200, data)
          } catch (error) {
            res.json(error);
          }
        })   
        .catch(error => {
          res.json(error)
        })
      }
      
    })   
    .catch(error => {
      res.json(error)
    })

  }
};
