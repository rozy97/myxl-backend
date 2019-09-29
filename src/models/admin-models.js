module.exports = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      db.query("", [email, password], (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }
};
