var express = require('express')
var router = express.Router()
var _ = require('lodash')
var methods = require('../../../data/methods')

/**
 * @api {get} /public/menu Public Menu Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePublicMenu
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

router.get('/', function (req, res, next) {
  res.send({ 'status': 200 })
})

/**
 * @api {get} /public/menu/:entity/:menuType Menu
 * @apiVersion 1.0.0-alpha-1
 * @apiName Menu
 * @apiGroup Public
 *
 * @apiSuccess {String} title Title of the menu
 * @apiSuccess {JSON} data JSON data of the menu
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'title': null,
 *       'data': [
 *         {
 *           'item_name': 'About',
 *           'item_url': 'about',
 *           'children': [
 *             {
 *               'item_name': 'Leadership and Administration',
 *               'item_url': 'administration'
 *             },
 *             {
 *               'item_name': 'Visitor Information',
 *               'item_url': 'visitor_information'
 *             }
 *           ]
 *         },
 *         {
 *           'item_name': 'Admissions',
 *           'item_url': 'admissions',
 *           'children': [
 *             {
 *               'item_name': 'Undergraduate Admissions',
 *               'item_url': 'undergraduate_admissions'
 *             },
 *             {
 *               'item_name': 'Graduate Admissions',
 *               'item_url': 'graduate_admissions'
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *
 * @apiError (501 - Menu Empty) {String} success false
 * @apiError (501 - Menu Empty) {String} code menu-empty
 *
 * @apiErrorExample {json} Error-Response 501 - Menu Empty:
 *     HTTP/1.1 501 Not Implemented
 *     {
 *       'success': 'false',
 *       'code': 'menu-empty'
 *     }
 *
 * @apiError (500 - Error Processing Menu) {String} success false
 * @apiError (500 - Error Processing Menu) {String} code menu-error
 *
 * @apiErrorExample {json} Error-Response 500 - Error Processing Menu:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       'success': 'false',
 *       'code': 'menu-error'
 *     }
 */

router.get('/:entity/:menuType', function (req, res) {
  // entity variable
  var entityVar = req.params.entity

  // menuType variable
  var menuTypeVar = req.params.menuType

  methods.Menu.obtainMenu(entityVar, menuTypeVar).then(function (result) {
    if (!_.isEmpty(result)) {
      res.json(result)
    } else {
      res.status(501).json({
        'success': 'false',
        'code': 'menu-empty'
      })
    }
  }).catch(function (err) {
    console.log(err)
    res.status(500).json({
      'success': 'false',
      'code': 'menu-error'
    })
  })
})

module.exports = router
