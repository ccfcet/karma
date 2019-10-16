const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const Authenticate = require(
  'authentication/set_authentication',
);

router.get('/', (req, res) => {
  res.json({
    status: 200,
  });
});

router.post('/', celebrate({
  body: Joi.object().keys({
    // Need a more precise form of validation, also checking if the input is
    // in the allowed charset
    password: Joi.string().min(12).max(30).required(),
    email: Joi.string().email(),
    dob: Joi.string(),
    firstname: Joi.string(),
    middlename: Joi.string().allow(''),
    lastname: Joi.string(),
    gender: Joi.string(),
    nationality: Joi.string(),
    // Need to formulate a better method of validation
    mobilenumber: Joi.number().integer(),
  }).xor('email', 'mobilenumber'),
}), (req, res) => {
//   console.log(req.body);
  if (req.headers['content-type'] === 'application/json') {
    if (Object.prototype.hasOwnProperty.call(req.body, 'password')) {
      Authenticate(req.body.email, req.body.password, req.body.firstname, req.body.middlename, req.body.lastname, req.body.gender, req.body.nationality, req.body.dob)
        .then((result) => {
          console.log(result);
          res.status(200).json({
            status: 200,
          });
        }).catch((err) => {
          console.error(err);
          res.status(500).json({
            status: 500,
          });
        });
    } else {
      res.status(400).json({
        status: 400,
      });
    }
  } else {
    res.status(401).json({
      status: 401,
    });
  }
});
module.exports = router;
