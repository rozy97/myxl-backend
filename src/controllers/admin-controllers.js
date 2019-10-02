const adminModels = require("../models/admin-models");
const formResponse = require("../helpers/form-response");

const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const crypto = require("crypto-js");
const secret = process.env.SECRET_KEY;

const formValidation = data => {
  const schema = joi.object().keys({
    name: joi
      .string()
      .min(3)
      .required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: joi
      .string()
      .min(6)
      .required()
  });
  const result = schema.validate(data);

  if (result.error == undefined) return true;
  else return false;
};

const hash = string => {
  return crypto.SHA256(string).toString(crypto.enc.Hex);
};

module.exports = {
  register: (req, res) => {
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    if (!formValidation(body)) {
      return formResponse.success(res, 401, { error: "Invalid Data!" });
    }

    body.password = hash(body.password);

    adminModels
      .register(body)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  },

  login: (req, res) => {
    const d = {
      email: req.body.email,
      password: hash(req.body.password)
    };

    adminModels
      .login(d)
      .then(result => {
        if (result.length !== 0) {
          const payload = { ...result[0], expiresIn: "1h" };

          jwt.sign(payload, secret, (err, token) => {
            if (err) {
              console.error(err);
            }

            res.setHeader("Authorization", `Bearer ${token}`);

            const data = {
              user: {
                id: result[0]._id,
                name: result[0].name,
                email: result[0].email
              },
              token
            };
            console.log(data);
            formResponse.success(res, 200, {}, data, result);
          });
        } else {
          const data = {
            user: null,
            token: null
          };
          formResponse.success(
            res,
            401,
            { error: "Wrong email or password!" },
            data
          );
        }
      })
      .catch(error => {
        res.json(error);
      });
  }
};
