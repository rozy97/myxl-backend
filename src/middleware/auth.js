require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const auth = {
  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader !== undefined) {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];

      try {
        const data = jwt.verify(token, secret);
        if (data) {
          req.id = data.id;
          req.email = data.email;
          req.name = data.name;
          next();
        }
      } catch (err) {
        console.log(err);
        res.sendStatus(403);
      }
    } else {
      console.error("no bearer", bearerHeader);
      res.sendStatus(403);
    }
  }
};

module.exports = auth;
