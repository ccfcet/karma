const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const authenticationAuthenticateKarma = require(
  'authentication/authenticate/karma',
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
    // Need to formulate a better method of validation
    mobilenumber: Joi.number().integer(),
  }).xor('email', 'mobilenumber'),
}), (req, res) => {
  console.log(`login/karma: ${req.body}`);
  if (req.headers['content-type'] === 'application/json') {
    if (Object.prototype.hasOwnProperty.call(req.body, 'password')) {
      // Is https really secure?
      if (Object.prototype.hasOwnProperty.call(req.body, 'email') && !Object
        .prototype.hasOwnProperty.call(req.body, 'mobileNumber')) {
        // On the assumption that the user has an email - feasible
        // console.log(`login/karma: ${req.body.email}`);

        // Verify the email password combination
        authenticationAuthenticateKarma.emailPassword(
          req.body.email, req.body.password,
        )
          .then((token) => {
            // localStorage.setItem('usertoken', token);
            res.json({
              token,
            });
          }).catch((err) => {
            console.error(err);
            res.status(500).json({
              status: 500,
            });
          });
      } else if (!Object.prototype.hasOwnProperty.call(req.body, 'email')
      && Object.prototype.hasOwnProperty.call(req.body, 'mobileNumber')) {
        // Based on the assumption that user
        // has a mobileNumber - again, feasible
        res.status(501).json({
          status: 501,
        });
      } else {
        res.status(400).json({
          status: 400,
        });
      }
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
