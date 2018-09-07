const express = require('express');

const router = express.Router();
const methods = require('data/methods');


/**
 * @api {get} /private/academics/classes GetClasses
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetClasses
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
  methods.Academics.classesMethods.getAllClasses()
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
 * @api {post} /private/academics/classes AddClasses
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddClasses
 * @apiGroup Academics
 *
 * @apiParam {Integer} streamId Stream ID
 * @apiParam {Date} startDate A valid start date for the class
 * @apiparam {String} currentClassSlug The present class slug
 * @apiParam {Integer} division Division
 * @apiParam {Date} endDate A valid end date for the class
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} course Course object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "course": {
      "id" : "4",
        "current_class_slug": "Slug-value",
        "stream_id": "6",
        "division": "5",
        "start_date": "2016-08-08T18:30:00.000Z",
        "end_date": "2017-08-08T18:30:00.000Z",
        "updatedAt": "2018-07-04T05:29:02.577Z",
        "createdAt": "2018-07-04T05:29:02.577Z"
    }
}
 */


router.post('/', (req, res) => {
  const info = {};

  info.stream_id = req.body.streamId;
  info.division = req.body.division;
  info.current_class_slug = req.body.currentClass;
  info.start_date = req.body.startDate;
  info.end_date = req.body.endDate;
  console.log(info);
  methods.Academics.classesMethods.addClasses(info)
    .then((model) => {
      res.send({
        status: 200,
        model,
      });
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err,
      });
    });
});

/**
 * @api {put} /private/academics/classes/
 * UpdateClasses
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateClasses
 * @apiGroup Academics
 *
 * @apiParam {Integer} streamId Stream ID
 * @apiParam {Date} startDate A valid start date for the class
 * @apiparam {String} currentClassSlug The present class slug
 * @apiParam {Integer} division Division
 * @apiParam {Date} endDate A valid end date for the class
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

router.put('/:classId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.classId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'streamId') && Object
    .prototype.hasOwnProperty.call(req.body, 'division') && Object.prototype
    .hasOwnProperty.call(req.body, 'currentClass') && Object.prototype
    .hasOwnProperty.call(req.body, 'startDate') && Object.prototype
    .hasOwnProperty.call(req.body, 'endDate')) {
    data.stream_id = req.body.streamId;
    data.division = req.body.division;
    data.current_class_slug = req.body.currentClass;
    data.start_date = req.body.startDate;
    data.end_date = req.body.endDate;
  }

  methods.Academics.classesMethods.updateClasses(info, data)
    .then((model) => {
      console.log(model);
      res.status(200).json({
        status: 'updated classes',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});

/**
 * @api {delete} /private/academics/classes/
 * DeleteClasses
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteClasses
 * @apiGroup Academics
 *
 * @apiParam {Integer} streamId Stream ID
 * @apiParam {Date} startDate A valid start date for the class
 * @apiparam {String} currentClassSlug The present class slug
 * @apiParam {Integer} division Division
 * @apiParam {Date} endDate A valid end date for the class
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

  info.stream_id = req.body.data.streamId;
  info.division = req.body.data.division;
  info.current_class_slug = req.body.data.currentClass;

  methods.Academics.classesMethods.deleteClasses(info)
    .then((model) => {
      console.log(model);
      res.status(200).json({
        status: 'deleted classes',
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
