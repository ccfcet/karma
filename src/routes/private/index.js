const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const secret = require('../../lib/authentication/access_token/secrets.json');
const methodsPeople = require('../../lib/data/methods/people').peopleMethods;
require('data/methods');

// For securing private routes

router.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.',
    });
  }
  // console.log('ROUTE SECRET', secret);
  jwt.verify(token, secret.secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.',
      });
    }
    methodsPeople.userIdExists(decoded.id).then((flag) => {
      if (flag) {
        req.body = { id: decoded.id };
        next();
      } else {
        res.status(500).send({
          auth: false,
          message: 'Token Invalid',
        });
      }
    })
      .catch((err) => {
        if (err) {
          console.error(err);
          res.status(401).send({
            auth: false,
            message: 'Token Invalid',
          });
        }
      });
  });
});


/**
 * @api {get} /private Private Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePrivate
 * @apiGroup EntryGates
 *
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 */
router.get('/', (req, res) => {
  res.send({ status: 200 });
  console.log('private');
});

router.use('/media', require('./media'));
router.use('/people', require('./people'));
router.use('/entities', require('./entities'));
router.use('/student', require('./student'));
router.use('/event', require('./event'));
router.use('/faculty', require('./faculty'));

module.exports = router;
