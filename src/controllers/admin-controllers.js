const adminModels = require("../models/admin-models");
const response = require("../helpers/form-response");

module.exports = {
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.email;
    adminModels
      .login(email, password)
      .then(result)
      .catch(err => {
        res.json(err);
      });
  }
};
