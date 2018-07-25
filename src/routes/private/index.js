const express = require('express');

const router = express.Router();

require('data/methods');

// var methods = require('_/data/methods')

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
});

router.use('/media', require('./media'));
router.use('/people', require('./people/people'));
router.use('/entity', require('./entity/entity'));
router.use('/entity/entity_type', require('./entity/entity_type'));
router.use('/academics', require('./academics'));
router.use('/student', require('./student'));
router.use('/event', require('./event'));

module.exports = router;
