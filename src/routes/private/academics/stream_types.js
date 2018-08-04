const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/**
 * @api {get} /private/academics/stream_types GetStreamTypes
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetStreamTypes
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
  methods.Academics.streamTypesMethods.getAllStreamTypes()
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
 * @api {post} /private/academics/stream_types AddStreamTypes
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddStreamTypes
 * @apiGroup Academics
 *
 * @apiParam {String} streamTypeLong Name of the stream type
 * @apiParam {String} streamTypeShort Short stream type
 * @apiParam {Date} startDate A valid start date for the course
 * @apiParam {Date} endDate A valid end date for the course
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
        "stream_type_long": "Computer Science And Engineering",
        "stream_type_short": "CSE",
        "start_date": "2016-08-08T18:30:00.000Z",
        "end_date": "2017-08-08T18:30:00.000Z",
        "updatedAt": "2018-07-04T05:29:02.577Z",
        "createdAt": "2018-07-04T05:29:02.577Z"
    }
}
 */


router.post('/', (req, res) => {
  const info = {};
  info.stream_type_long = req.body.streamType;
  info.stream_type_short = req.body.streamTypeShort;
  info.start_date = req.body.startDate;
  info.end_date = req.body.endDate;
  methods.Academics.streamTypesMethods.addStreamType(info)
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
 * @api {put} /private/academics/stream_types/
 * UpdateStreamTypes
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateStreamTypes
 * @apiGroup Academics
 *
 * @apiParam {String} streamTypeLong Name of the stream type
 * @apiParam {String} streamTypeShort Short stream type
 * @apiParam {Date} startDate A valid start date for the course
 * @apiParam {Date} endDate A valid end date for the course
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

router.put('/:streamId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.streamId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'streamType') && Object
    .prototype.hasOwnProperty.call(req.body, 'streamTypeShort') && Object
    .prototype.hasOwnProperty.call(req.body, 'startDate') && Object.prototype
    .hasOwnProperty.call(req.body, 'endDate')) {
    data.stream_type_long = req.body.streamType;
    data.stream_type_short = req.body.streamTypeShort;
    data.start_date = req.body.startDate;
    data.end_date = req.body.endDate;
  }

  methods.Academics.streamTypesMethods.updateStreamTypes(info, data)
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
 * @api {delete} /private/academics/stream_types/
 * DeleteStreamTypes
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteStreamTypes
 * @apiGroup Academics
 *
 * @apiParam {String} streamTypeLong Name of the stream type
 * @apiParam {String} streamTypeShort Short stream type
 * @apiParam {Date} startDate A valid start date for the course
 * @apiParam {Date} endDate A valid end date for the course
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

  info.id = req.body.streamId;
  methods.Academics.streamTypesMethods.deleteStreamTypes(info)
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
