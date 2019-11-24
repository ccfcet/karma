const express = require('express');

const router = express.Router();
const methods = require('data/methods');

/**
 * @api {get} /private/people/people GetPeople
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetPeople
 * @apiGroup People
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
  methods.People.peopleMethods.getAllPeople()
    .then((classes) => {
      console.log(classes);
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


router.post('/details', (req, res) => {
  methods.People.peopleMethods.getPeople(req.body)
    .then((classes) => {
      console.log(classes);
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
 * @api {post} /private/people/people AddPeople
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddPPeople
 * @apiGroup People
 *
 * @apiParam {String} streamTypeLong Name of the stream type
 * @apiParam {String} streamTypeShort Short stream type
 * @apiParam {Date} startDate A valid start date for the stream type
 * @apiParam {Date} endDate A valid end date for the stream type
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} people People object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "status": "success",
    "classes": [
        {
            "id": 1,
            "stream_type_long": "Bachelor of Technology",
            "stream_type_short": "B.Tech",
            "start_date": "1997-01-01T00:00:00.000Z",
            "end_date": "1998-01-01T00:00:00.000Z",
            "created_at": "2018-08-04T00:51:52.000Z",
            "updated_at": "2018-08-04T01:00:38.000Z"
        },
        {
            "id": 2,
            "stream_type_long": "Master of Technology",
            "stream_type_short": "M.Tech",
            "start_date": "1997-01-01T00:00:00.000Z",
            "end_date": "1998-01-01T00:00:00.000Z",
            "created_at": "2018-08-04T00:54:43.000Z",
            "updated_at": "2018-08-04T01:00:51.000Z"
        }
    ]
}
 */


router.post('/', (req, res, next) => {
  const info = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'firstName')
    && Object.prototype.hasOwnProperty.call(req.body, 'middleName')
    && Object.prototype.hasOwnProperty.call(req.body, 'lastName')
    && Object.prototype.hasOwnProperty.call(req.body, 'gender')
    && Object.prototype.hasOwnProperty.call(req.body, 'dateOfBirth')
    && Object.prototype.hasOwnProperty.call(req.body, 'nationality')) {
    info.first_name = req.body.firstName;
    info.middle_name = req.body.middleName;
    info.last_name = req.body.lastName;
    info.gender = req.body.gender;
    info.date_of_birth = req.body.dateOfBirth;
    info.nationality = req.body.nationality;

    console.log(info);
    methods.People.peopleMethods.addPeople(info)
      .then((model) => {
        res.status(200).json({
          message: 'success',
          people: model,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          error: err.message,
        });
      });
  } else {
    console.log('request could not be accepted');
    next();
  }
});

/**
 * @api {put} /private/people/people/
 * UpdatePeople
 * @apiVersion 1.0.0-alpha-1
 * @apiName UpdatePeople
 * @apiGroup People
 *
 * @apiParam {String} streamTypeLong Name of the stream type
 * @apiParam {String} streamTypeShort Short stream type
 * @apiParam {Date} startDate A valid start date for the stream
 * @apiParam {Date} endDate A valid end date for the stream
 *
 * @apiSuccess {String} message message
 * @apiSuccess {json} course Course object
 *
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
{
    "message": "Updated People",
}
 */

router.put('/:peopleId', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.peopleId; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'firstName')
    && Object.prototype.hasOwnProperty.call(req.body, 'middleName')
    && Object.prototype.hasOwnProperty.call(req.body, 'lastName')
    && Object.prototype.hasOwnProperty.call(req.body, 'gender')
    && Object.prototype.hasOwnProperty.call(req.body, 'dateOfBirth')
    && Object.prototype.hasOwnProperty.call(req.body, 'nationality')) {
    data.first_name = req.body.firstName;
    data.middle_name = req.body.middleName;
    data.last_name = req.body.lastName;
    data.gender = req.body.gender;
    data.date_of_birth = req.body.dateOfBirth;
    data.nationality = req.body.nationality;
  }

  methods.People.peopleMethods.updatePeople(info, data)
    .then(() => {
      res.status(200).json({
        status: 'Updated People',
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row may not exist',
        state: err.message,
      });
    });
});

/**
 * @api {delete} /private/people/people/
 * DeletePeople
 * @apiVersion 1.0.0-alpha-1
 * @apiName DeletePeople
 * @apiGroup People
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
  info.id = req.body.peopleId;
  methods.People.peopleMethods.deletePeople(info)
    .then((model) => {
      res.status(200).json({
        status: 'People Deleted',
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
