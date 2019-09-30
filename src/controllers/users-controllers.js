const userModels = require('../models/users-models');
const formResponse = require('../helpers/form-response');

module.exports = {
  getAlluser: (req, res) => {
    userModels.getAllUser()
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
  }

  // login: (req, res) => {
  //   usersModels
  //     .login(req.number)
  //     .then()
  //     .catch();
  // },
  // editProfile: (req, res) => {
  //   userModels
  //     .editProfile(data)
  //     .then()
  //     .catch();
  // },
  // shareBalance: (req, res) => {
  //   userModels
  //     .shareBalance(data)
  //     .then()
  //     .catch();
  // }
};
