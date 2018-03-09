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
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 *
 * @apiError (501 - Menu Empty) {String} success false
 * @apiError (501 - Menu Empty) {String} response-code menu-empty
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 501 Not Implemented
 *     {
 *       'success': 'false',
 *       'response-code': 'menu-empty'
 *     }
 */

router.get('/:entity/:menuType', function (req, res) {
  // returnObject
  // var returnObject = []

  // entity variable
  var entityVar = req.params.entity

  // menuType variable
  var menuTypeVar = req.params.menuType

  // var getChildren = function (elementID, menuParentChildResult) {
  //   var returnArray = []
  //
  //   _.each(menuParentChildResult, function (element, index, list) {
  //     if (element.parentID === elementID) {
  //       returnArray.push(element.childID)
  //     }
  //   })
  //
  //   return returnArray
  // }

  // var getParent = function (elementID, menuParentChildResult) {
  //   var parentID = null
  //
  //   _.each(menuParentChildResult, function (element, index, list) {
  //     if (element.childID === elementID) {
  //       if (parentID == null) {
  //         parentID = element.parentID
  //       } else {
  //         console.log('Warning: Inconsistent data obtained from database. Multiple parents found for same menu element.')
  //       }
  //     }
  //   })
  //
  //   return parentID
  // }

  // var addAsParent = function (element, childArray, addedFlag) {
  //   return addedFlag
  // }

  // var addAsChild = function (childElement, parentID, addedFlag) {
  //   _.each(returnObject, function (element, index, list) {
  //     if (element.id === parentID) {
  //       if (_.isArray(element.children)) {
  //         // children array already exists
  //         element.children.push(childElement.toJSON())
  //
  //         // return successful addition
  //         addedFlag = 1
  //       } else {
  //         element.children = []
  //         element.children.push(childElement.toJSON())
  //
  //         // return successful addition
  //         addedFlag = 1
  //       }
  //     }
  //   })
  //
  //   // return addedFlag without change
  //   return addedFlag
  // }

  // var addElement = function (element) {
  //   returnObject.push(element.toJSON())
  // }

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
