const userModels = require('../models/users-models');
const formResponse = require('../helpers/form-response');

module.exports = {
  getUser: (req, res) => { 
    const number = req.params.number;
    userModels.getUser(number)
    .then(result => {
      formResponse.success(res, 200, result[0])
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
