const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/**
 * @api {get} /private/academics/time_slots GetTimeSlots
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetTimeSlots
 * @apiGroup Academics
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
  methods.Academics.timeSlotsMethods.getAllTimeSlots()
    .then((classes) => {
      res.json({
        status: 'success',
        classes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

/**
 * @api {post} /private/academics/time_slots AddTimeSlots
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddTimeSlots
 * @apiGroup Academics
 *
 * @apiParam {Date} startTimestamp Starting timestamp
 * @apiParam {Date} endTimestamp Ending timestamp
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} course Course object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "course": {
        "id": "4",
        "start_timestamp": "2016-08-08T18:30:00.000Z",
        "end_timestamp": "2017-08-08T18:30:00.000Z",
        "updatedAt": "2018-07-04T05:29:02.577Z",
        "createdAt": "2018-07-04T05:29:02.577Z"
    }
}
 */

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

/**
 * @api {put} /private/academics/time_slots/
 * UpdateTimeSlots
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateTimeSlots
 * @apiGroup Academics
 *
 * @apiParam {Date} startTimestamp Starting timestamp
 * @apiParam {Date} endTimestamp Ending timestamp
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} course Course object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "status": "updated",
    "state": [
        1
    ]
}
 */

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

/**
 * @api {delete} /private/academics/time_slots/
 * DeleteTimeSlots
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteTimeSlots
 * @apiGroup Academics
 *
 * @apiParam {Date} startTimestamp Starting timestamp
 * @apiParam {Date} endTimestamp Ending timestamp
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} course Course object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Deleted"
}
 */

router.delete('/', (req, res) => {
  const info = {};

  info.id = req.body.timeSlotId;

  methods.Academics.timeSlotsMethods.deleteTimeSlots(info)
    .then((model) => {
      res.status(200).json({
        status: 'TimeSlots deleted',
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
