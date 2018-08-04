const express = require('express');

const router = express.Router();
const _ = require('lodash');

const methodsEntitites = require('data/methods/entities');
const methodsFaculty = require('data/methods/faculty');

/**
* @api {get} /public/information Public Information Entry Gate
* @apiVersion 1.0.0-alpha-1
* @apiName EntryGatePublicInformation
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

/**
* @api {get} /public/information/:entityInformationSlug/:entitySlug Information
* @apiVersion 1.0.0-alpha-1
* @apiName Information
* @apiGroup Public
*
* @apiSuccess {json} data json data matching the request
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "data": "Back-end API framework for colleges.",
*       "title": "Karma"
*     }
*
* @apiError (501 - Information Empty) {String} success false
* @apiError (501 - Information Empty) {String} code information-empty
*
* @apiErrorExample {json} Error-Response 501 - Information Empty:
*     HTTP/1.1 501 Not Implemented
*     {
*       'success': 'false',
*       'code': 'information-empty'
*     }
*
* @apiError (500 - Error Retrieving Information) {String} success false
* @apiError (500 - Error Retrieving Information) {String} code information-error
*
* @apiErrorExample {json} Error-Response 500 - Error Retrieving Information:
*     HTTP/1.1 500 Internal Server Error
*     {
*       'success': 'false',
*       'code': 'information-error'
*     }
*/

router.get('/:entityInformationSlug/:entitySlug', (req, res) => {
  // entityInformationSlug variable
  const { entityInformationSlug } = req.params;

  // entitySlug
  const { entitySlug } = req.params;

  methodsEntitites
    .obtainInformation
    .obtainInformation(entitySlug, entityInformationSlug)
    .then((result) => {
      if (!_.isEmpty(result)) {
        res.json({
          success: true,
          data: result,
        });
      } else {
        res.status(501).json({
          success: 'false',
          code: 'information-empty',
        });
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        success: 'false',
        code: 'information-error',
      });
    });
});

// router.get('/:slug/:position/:name', (req, res) => {
// models.peopleInformation.findAll({
//   include: [
//     {
//       model: models.people,
//       attributes: [`pslugname`],
//       where: { pslugname: req.params.name }
//     },
//     {
//       model: models.peopleSlugs,
//       attributes: [`slugName`],
//       where: { slugName: req.params.slug }
//     }
//   ],
//   // where: { ename: req.params.entity },
//   attributes: ['data']
// }).then(function (result) {
//   result = result[0].data
//   res.json({ 'value': result })
//   // return result;
// }).catch(function (err) {
//   // handle error;
//   console.log(err)
//   res.json({ 'success': 'false' })
// })
// });

router.get('/faculties', (req, res) => {
  // res.json({ 'status': 200 })
  methodsFaculty.obtainInformation()
    .then((result) => {
      if (!_.isEmpty(result)) {
        res.json(result);
      } else {
        res.status(501).json({
          success: 'false',
          code: 'information-empty',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: 'false',
        code: 'information-error',
      });
    });
});

module.exports = router;
