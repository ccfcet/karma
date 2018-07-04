const express = require('express');

const router = express.Router();
const methods = require('data/methods');

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
  res.send({
    status: 200,
  });
});

router.post('/', (req, res) => {
  const info = {};
  info.start_timestamp = req.body.startTimestamp;
  info.end_timestamp = req.body.endTimestamp;

  console.log(info);
  methods.Academics.timeSlotsMethods.addTimeSlots(info)
    .then((model) => {
      res.send(model);
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err,
      });
    });
});

router.put('/:timeSlotId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.timeSlotId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'startTimestamp') && Object
    .prototype.hasOwnProperty.call(req.body, 'endTimestamp')) {
    data.start_timestamp = req.body.startTimestamp;
    data.end_timestamp = req.body.endTimestamp;
  }

  methods.Academics.timeSlotsMethods.updateTimeSlots(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated stream type',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row may not exist',
        state: err,
      });
    });
});

router.delete('/', (req, res) => {
  const info = {};

  info.id = req.body.timeSlotId;

  methods.Academics.timeSlotsMethods.deleteTimeSlots(info)
    .then((model) => {
      res.status(200).json({
        status: 'stream Type deleted',
        state: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Not able to delete.The row may not exist.',
        state: err,
      });
    });
});

module.exports = router;
