const express = require('express');

const router = express.Router();

const methods = require('data/methods');

/**
 * @api {get} /private/academics/courses_offered GetCoursesOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetCoursesOffered
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
  methods.Academics.coursesOfferedMethods.getAllCoursesOffered()
    .then((model) => {
      console.log('courses offered');
      res.status(200).json({
        message: 'success',
        classes: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        err,
      });
    });
});


router.get('/:course_id', (req, res) => {
  const data = {};
  data.course_id = req.params.course_id;
  methods.Academics.coursesOfferedMethods.getCourseData(data)
    .then((model) => {
      console.log('course data');
      res.status(200).json({
        message: 'success',
        course: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        err,
      });
    });
});


/**
 * @api {post} /private/academics/courses_offered AddCoursesOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddCoursesOffered
 * @apiGroup Academics
 *
 * @apiParam {String} officialCourseId Official course Id
 * @apiParam {Number} departmentId Department ID
 * @apiparam {String} name Official Name of the course
 * @apiParam {Integer} credits Number of credits for the course
 * @apiParam {Date} validStartDate A valid start date for the course
 * @apiParam {Date} validEndDate A valid end date for the course
 * @apiParam {Integer} durationInDays Duration of the course in days
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
        "official_course_id": "CS310",
        "department_id": "6",
        "name": "Computer Vision",
        "credits": "3",
        "valid_start_date": "2016-08-08T18:30:00.000Z",
        "valid_end_date": "2017-08-08T18:30:00.000Z",
        "duration_in_days": "72",
        "updatedAt": "2018-07-04T05:29:02.577Z",
        "createdAt": "2018-07-04T05:29:02.577Z"
    }
}
 */

router.post('/', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'officialCourseId')
    && Object.prototype.hasOwnProperty.call(req.body, 'departmentId')
    && Object.prototype.hasOwnProperty.call(req.body, 'name')
    && Object.prototype.hasOwnProperty.call(req.body, 'credits')
    && Object.prototype.hasOwnProperty.call(req.body, 'validStartDate')
    && Object.prototype.hasOwnProperty.call(req.body, 'validEndDate')
    && Object.prototype.hasOwnProperty.call(req.body, 'durationInDays')) {
    const info = {};
    info.official_course_id = req.body.officialCourseId;
    info.department_id = req.body.departmentId;
    info.name = req.body.name;
    info.credits = req.body.credits;
    info.valid_start_date = req.body.validStartDate;
    info.valid_end_date = req.body.validEndDate;
    info.duration_in_days = req.body.durationInDays;
    methods.Academics.coursesOfferedMethods.addCoursesOffered(info)
      .then((model) => {
        res.status(200).json({
          message: 'success',
          course: model,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'error',
          error: err,
        });
      });
  } else {
    next();
  }
});

/**
 * @api {put} /private/academics/courses_offered/
 * UpdateCoursesOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateCoursesOffered
 * @apiGroup Academics
 *
 * @apiParam {String} officialCourseId Official course Id
 * @apiParam {Number} departmentId Department ID
 * @apiparam {Stirng} name Official Name of the course
 * @apiParam {Integer} credits Number of credits for the course
 * @apiParam {Date} validStartDate A valid start date for the course
 * @apiParam {Date} validEndDate A valid end date for the course
 * @apiParam {Integer} durationInDays Duration of the course in days
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

router.put('/:course_offered_id', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'officialCourseId')
    && Object.prototype.hasOwnProperty.call(req.body, 'departmentId')
    && Object.prototype.hasOwnProperty.call(req.body, 'name')
    && Object.prototype.hasOwnProperty.call(req.body, 'credits')
    && Object.prototype.hasOwnProperty.call(req.body, 'validStartDate')
    && Object.prototype.hasOwnProperty.call(req.body, 'validEndDate')
    && Object.prototype.hasOwnProperty.call(req.body, 'durationInDays')) {
    const info = {};
    const data = {};
    info.id = parseInt(req.params.course_offered_id, 10);
    console.log(req.body);

    data.official_course_id = req.body.officialCourseId;
    data.department_id = req.body.departmentId;
    data.name = req.body.name;
    data.credits = req.body.credits;
    data.valid_start_date = req.body.validStartDate;
    data.valid_end_date = req.body.validEndDate;
    data.duration_in_days = req.body.durationInDays;
    methods.Academics.coursesOfferedMethods.updateCoursesOffered(info, data)
      .then((model) => {
        res.status(200).json({
          status: 'updated courses offered',
          state: model,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'Not able to update.Row maynot exist',
          state: err,
        });
      });
  } else {
    next();
  }
});

/**
 * @api {delete} /private/academics/courses_offered/
 * DeleteCoursesOffered
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdateCoursesOffered
 * @apiGroup Academics
 *
 * @apiParam {String} officialCourseId Official course Id
 * @apiParam {Number} departmentId Department ID
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
  console.log('entered delete-coursesOffered');
  console.log(req.body);
  if (Object.prototype.hasOwnProperty.call(req.body.data, 'officialCourseId')
    && Object.prototype.hasOwnProperty.call(req.body.data, 'departmentId')) {
    const info = {};
    info.department_id = req.body.data.departmentId;
    info.official_course_id = req.body.data.officialCourseId;

    methods.Academics.coursesOfferedMethods.deleteCoursesOffered(info)
      .then((noOfRowsDeleted) => {
        console.log(noOfRowsDeleted);
        res.status(200).json({
          message: 'courses_offered deleted',
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'Not able to delete.The row may not exist.',
          state: err,
        });
      });
  }
});

module.exports = router;
