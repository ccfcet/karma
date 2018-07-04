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

/* router.post('/people', function (req, res) {
  var info = {}
  info.first_name = req.body.firstName
  info.middle_name = req.body.middleName
  info.last_name = req.body.lastName
  info.gender = req.body.gender
  info.date_of_birth = req.body.dateOfBirth
  info.nationality = req.body.nationality
  info.email = req.body.email
  info.phone_number = req.body.phoneNumber
  methods.People.addPeople(info)
    .then((model) => {
      res.send(model)
    })
    .catch((err) => {
      res.send({
        'status': 'error',
        'error': err
      })
    })
}) */


// router.use('/information', require('./information'))

// router.use('/people', require('./people'));

// router.use('/entity', require('./entity'));
router.use('/media', require('./media'));
router.use('/people', require('./people/people'));
router.use('/entity', require('./entitiy/entity'));
router.use('/entity/entity_type', require('./entitiy/entity_type'));
router.use('/academics', require('./academics'));
router.use('/student', require('./student'));
router.use('/event', require('./event/event'));

module.exports = router;
