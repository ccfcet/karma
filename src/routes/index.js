const express = require('express');

const router = express.Router();

const { secret } = require('../lib/authentication/access_token/secrets.json');
const methodsPeople = require('../lib/data/methods/people');

/**
 * @api {get} / Main Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGateMain
 * @apiGroup EntryGates
 *
 * @apiSuccess {String} name Karma API.
 * @apiSuccess {String} version Current version of Karma.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'name': 'Karma API',
 *       'version': '1.0.0-alpha-1'
 *     }
 */

router.get('/', (req, res) => {
  res.json({
    name: 'Karma API',
    version: '1.0.0-alpha-1',
  });
});

router.use('/authentication', require('./authentication'));
router.use('/public', require('./public'));

router.use('/private', (res, req, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.',
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.',
      });
    }

    methodsPeople.userIdExists(decoded.id).then((flag) => {
      if (flag) {
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


router.use('/private', require('./private'));

module.exports = router;
