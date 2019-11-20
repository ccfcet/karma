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


router.use('/private', require('./private'));

module.exports = router;
