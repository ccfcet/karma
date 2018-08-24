const express = require('express');

const router = express.Router();
const methods = require('data/methods');


router.get('/', (req, res) => {
  methods.Academics.streamsOfferedMethods.getAllStreamsOffered()
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
 * @api {get} /private/academics/streams_offered GetStreamsOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetStreamsOffered
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
router.get('/:stream_type', (req, res, next) => {
  methods.Academics.streamsOfferedMethods
    .getAllStreamsOfferedOfStreamType(req.params.stream_type)
    .then((streams) => {
      res.json({
        streams,
      });
    }).catch((err) => {
      next(err);
    });
});

/**
 * @api {post} /private/academics/streams_offered AddStreamsOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddStreamsOffered
 * @apiGroup Academics
 *
 * @apiParam {Integer} streamTypeId Stream Type ID
 * @apiParam {String} streamName Stream Name
 * @apiParam {Integer} departmentId Department ID
 * @apiParam {Date} validStartDate A valid start date
 * @apiParam {Date} validEndDate A valid end date
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
        "stream_type_id": "6",
        "stream_name": "Computer Science And Engineering",
        "valid_start_date": "2016-08-08T18:30:00.000Z",
        "valid_end_date": "2017-08-08T18:30:00.000Z",
        "department_id": "8",
        "updatedAt": "2018-07-04T05:29:02.577Z",
        "createdAt": "2018-07-04T05:29:02.577Z"
    }
}
 */

router.post('/', (req, res) => {
  const info = {};
  info.stream_type_id = req.body.streamId;
  info.stream_name = req.body.streamName;
  info.department_id = req.body.departmentId;
  info.valid_start_date = req.body.startDate;
  info.valid_end_date = req.body.endDate;
  console.log(info);
  methods.Academics.streamsOfferedMethods.addStreamsOffered(info)
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
 * @api {put} /private/academics/streams_offered/
 * UpdateStreamsOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateStreamsOffered
 * @apiGroup Academics
 *
 * @apiParam {Integer} streamTypeId Stream Type ID
 * @apiParam {String} streamName Stream Name
 * @apiParam {Integer} departmentId Department ID
 * @apiParam {Date} validStartDate A valid start date
 * @apiParam {Date} validEndDate A valid end date
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

router.put('/:streamsOfferedId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.streamsOfferedId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'streamId') && Object
    .prototype.hasOwnProperty.call(req.body, 'streamName') && Object
    .prototype.hasOwnProperty.call(req.body, 'departmentId') && Object
    .prototype.hasOwnProperty.call(req.body, 'startDate') && Object.prototype
    .hasOwnProperty.call(req.body, 'endDate')) {
    data.stream_type_id = req.body.streamId;
    data.stream_name = req.body.streamName;
    data.department_id = req.body.departmentId;
    data.valid_start_date = req.body.startDate;
    data.valid_end_date = req.body.endDate;
  }

  methods.Academics.streamsOfferedMethods.updateStreamsOffered(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated streams offered',
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
 * @api {delete} /private/academics/streams_offered/
 * DeleteStreamsOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteStreamsOffered
 * @apiGroup Academics
 *
 * @apiParam {Integer} streamTypeId Stream Type ID
 * @apiParam {String} streamName Stream Name
 * @apiParam {Integer} departmentId Department ID
 * @apiParam {Date} validStartDate A valid start date
 * @apiParam {Date} validEndDate A valid end date
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

  info.id = req.body.id;

  methods.Academics.streamsOfferedMethods.deleteStreamsOffered(info)
    .then((model) => {
      res.status(200).json({
        status: 'streams offered deleted',
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
