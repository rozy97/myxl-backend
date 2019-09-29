module.exports = {
  login: (req, res) => {
    usersModels
      .login(req.number)
      .then()
      .catch();
  },
  editProfile: (req, res) => {
    userModels
      .editProfile(data)
      .then()
      .catch();
  },
  shareBalance: (req, res) => {
    userModels
      .shareBalance(data)
      .then()
      .catch();
  }
};
