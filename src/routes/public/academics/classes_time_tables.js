const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/**
 * @api {get} /private/academics/classes_time_tables GetClassesTimeTables
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetClassesTimeTables
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
  methods.Academics.classesTimeTablesMethods.getAllClassesTimeTables()
    .then((model) => {
      res.status(200).json({
        status: 'success',
        classes: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err,
      });
    });
});


/**
 * @api {post} /private/academics/classes_time_tables AddClassesTimeTables
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddClassesTimeTables
 * @apiGroup Academics
 *
 * @apiParam {Integer} classId Class ID
 * @apiParam {Integer} timeSlotId ID for each time slot
 * @apiparam {String} day The day
 * @apiParam {Integer} courseId Course ID
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} course Course object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "success",
    "course": {
        "id" : 4,
        "class_id": "2",
        "course_id": "20",
        "day": "Monday",
        "time_solt_id": "3",
        "updatedAt": "2018-07-04T05:29:02.577Z",
        "createdAt": "2018-07-04T05:29:02.577Z"
    }
}
 */


router.post('/', (req, res) => {
  const info = {};

  info.class_id = req.body.classId;
  info.day = req.body.day;
  info.time_slot_id = req.body.timeSlotId;
  info.course_id = req.body.courseId;
  info.faculty_id = req.body.facultyId;

  methods.Academics.classesTimeTablesMethods.addClassesTimeTables(info)
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
 * @api {put} /private/academics/classes_time_tables UpdateClassesTimeTables
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateClassesTimeTables
 * @apiGroup Academics
 *
 * @apiParam {Integer} classId Class ID
 * @apiParam {Integer} timeSlotId ID for each time slot
 * @apiparam {String} day The day
 * @apiParam {Integer} courseId Course ID
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

router.put('/:cttId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.cttId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'classId')
   && Object.prototype.hasOwnProperty.call(req.body, 'day')
   && Object.prototype.hasOwnProperty.call(req.body, 'timeSlotId')
   && Object.prototype.hasOwnProperty.call(req.body, 'courseId')
   && Object.prototype.hasOwnProperty.call(req.body, 'facultyId')) {
    data.class_id = req.body.classId;
    data.day = req.body.day;
    data.time_slot_id = req.body.timeSlotId;
    data.course_id = req.body.courseId;
    data.faculty_id = req.body.facultyId;
  }

  methods.Academics.classesTimeTablesMethods.updateClassesTimeTables(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated classes_time_tables',
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
 * @api {delete} /private/academics/classes_time_tables DeleteClassesTimeTables

 * @apiVersion 1.0.0-alpha-1
 * @apiName DeleteClassesTimeTables
 * @apiGroup Academics
 *
 * @apiParam {Integer} classId Class ID
 * @apiParam {Integer} timeSlotId ID for each time slot
 * @apiparam {String} day The day
 * @apiParam {Integer} courseId Course ID
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

  methods.Academics.classesTimeTablesMethods.deleteClassesTimeTables(info)
    .then((model) => {
      res.status(200).json({
        status: 'classes_time_tables deleted',
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
