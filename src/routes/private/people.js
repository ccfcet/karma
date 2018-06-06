var express = require('express')
var router = express.Router()
var methods = require('_/data/methods')

/**
 * @api {post} /private/people AddPeople
 * @apiVersion 1.0.0-alpha-1
 * @apiName AddPeople
 * @apiGroup People
 *
 * @apiSuccess {id} id People ID of the user
 * @apiSuccess {String} first_name First Name of the user
 * @apiSuccess {String} middle_name Middle Name of the user
 * @apiSuccess {String} last_name Last Name of the user
 * @apiSuccess {Char} gender Gender
 * @apiSuccess {Date} date_of_birth Date of birth of the user
 * @apiSuccess {String} nationality Nationality of the user
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {String} firstName First Name of the user
 * @apiParam {String} middleName Middle Name of the user
 * @apiParam {String} lastName Last Name of the user
 * @apiParam {Char} gender Gender
 * @apiParam {Date} dateOfBirth Date of birth of the user
 * @apiParam {String} nationality Nationality of the user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 7,
 *       "first_name": "John",
 *       "middle_name": "",
 *       "last_name": "Doe",
 *       "gender": "M",
 *       "date_of_birth": "1997-09-19",
 *       "nationality": "Indian",
 *       "updatedAt": "2018-06-04T05:05:37.992Z",
 *       "createdAt": "2018-06-04T05:05:37.992Z"
 *     }
 */

router.post('/', function (req, res) {
  var info = {}
  if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('middleName') &&
    req.body.hasOwnProperty('lastName') && req.body.hasOwnProperty('gender') &&
    req.body.hasOwnProperty('dateOfBirth') && req.body.hasOwnProperty('nationality') &&
    req.body.hasOwnProperty('email') && req.body.hasOwnProperty('phoneNumber')) {
    info.first_name = req.body.firstName
    info.middle_name = req.body.middleName
    info.last_name = req.body.lastName
    info.gender = req.body.gender
    info.date_of_birth = req.body.dateOfBirth
    info.nationality = req.body.nationality
    info.email = req.body.email
    info.phone_number = req.body.phoneNumber
    methods.people.addPeople(info)
      .then((model) => {
        res.send(model)
      })
      .catch((err) => {
        res.send({
          'status': 'error',
          'error': err
        })
      })
  }
})

/**
 * @api {get} /private/people/:id GetPeopleById
 * @apiVersion 1.0.0-alpha-1
 * @apiName GetPeopleById
 * @apiGroup People
 *
 * @apiSuccess {id} id People ID of the user
 * @apiSuccess {Stirng} first_name First Name of the user
 * @apiSuccess {String} middle_name Middle Name of the user
 * @apiSuccess {String} last_name Last Name of the user
 * @apiSuccess {Char} gender Gender
 * @apiSuccess {Date} date_of_birth Date of birth of the user
 * @apiSuccess {String} nationality Nationality of the user
 * @apiSuccess {Date} createdAt createdAt
 * @apiSuccess {Date} updatedAt updatedAt
 *
 * @apiParam {Number} id peopleID of the user
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *     {
 *      "data": {
 *          "id": 7,
 *          "first_name": "John",
 *          "middle_name": "",
 *          "last_name": "Doe",
 *          "gender": "M",
 *          "date_of_birth": "1987-01-01",
 *          "nationality": "Indian",
 *          "createdAt": "2018-06-04T08:56:51.000Z",
 *          "updatedAt": "2018-06-04T08:56:51.000Z"
 *      }
 *     }
 */

router.get('/:id', function (req, res) {
  var peopleId = req.params.id
  methods.People.findPeopleById(peopleId)
    .then((people) => {
      res.send({
        data: people.dataValues
      })
    })
    .catch((err) => {
      res.send({
        'status': 'error',
        'error': err
      })
    })
})

router.put('/:slugName', (req, res) => {
  var slugName = req.params.slugName
  methods.People.insertSlug(slugName)
    .then((slug) => {
      res.send({
        status: 'success',
        slug
      })
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err
      })
    })
})

router.put('/:peopleId/:slugName', (req, res) => {
  var slugName = req.params.slugName
  var peopleId = req.params.peopleId
  var slugValue = req.body.value
  methods.People.putInformationUsingSlug(peopleId, slugName, slugValue)
    .then((info) => {
      res.send({
        status: 'success',
        information: info
      })
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err
      })
    })
})

router.get('/:peopleId/:slugName', (req, res) => {
  var slugName = req.params.slugName
  var peopleId = req.params.peopleId
  console.log(slugName)
  console.log(peopleId)
  methods.People.getInformationUsingSlug(peopleId, slugName)
    .then((info) => {
      res.send({
        status: 'success',
        information: info
      })
    })
    .catch((err) => {
      res.send({
        status: 'error',
        error: err
      })
    })
})

module.exports = router
