var express = require('express')
var router = express.Router()
var models = require('../../../models')
var _ = require('underscore')

router.get('/', function (req, res, next) {
  res.send({ 'status': 200 })
})

router.get('/:entity/:menuType', function (req, res) {
  // returnObject
  var returnObject = []

  // entity variable
  var entityVar = req.params.entity

  // menuType variable
  var menuTypeVar = req.params.menuType

  function getChildren (elementID, menuParentChildResult) {
    var returnArray = []

    _.each(menuParentChildResult, function (element, index, list) {
      if (element.parentID === elementID) {
        returnArray.push(element.childID)
      }
    })

    return returnArray
  }

  function getParent (elementID, menuParentChildResult) {
    var parentID = null

    _.each(menuParentChildResult, function (element, index, list) {
      if (element.childID === elementID) {
        if (parentID == null) {
          parentID = element.parentID
        } else {
          console.log('Warning: Inconsistent data obtained from database. Multiple parents found for same menu element.')
        }
      }
    })

    return parentID
  }

  function addAsParent (element, childArray, addedFlag) {
    return addedFlag
  }

  function addAsChild (childElement, parentID, addedFlag) {
    _.each(returnObject, function (element, index, list) {
      if (element.id === parentID) {
        if (_.isArray(element.children)) {
          // children array already exists
          element.children.push(childElement.toJSON())

          // return successful addition
          addedFlag = 1
        } else {
          element.children = []
          element.children.push(childElement.toJSON())

          // return successful addition
          addedFlag = 1
        }
      }
    })

    // return addedFlag without change
    return addedFlag
  }

  function addElement (element) {
    returnObject.push(element.toJSON())
  }

  // obtain results from menuData matching entity and menuType
  models.menuData.findAll({
    include: [
      {
        model: models.entities,
        attributes: [],
        where: { ename: entityVar }
      }
    ],
    where: { menuType: menuTypeVar },
    attributes: ['id', 'itemName', 'itemUrl', 'position']
  }).then(function (result) {
    // store result for further use
    var menuDataResult = result

    // obtain results from menuParentChildren matching entity and menuType
    models.menuParentChild.findAll({
      attributes: ['id', 'parentID', 'childID']
    }).then(function (result) {
      // store result for further use
      var menuParentChildResult = result

      _.each(menuDataResult, function (element, index, list) {
        var addedFlag = 0

        // check if element is a parent
        var getChildrenReturnArray = getChildren(element.id, menuParentChildResult)

        if (getChildrenReturnArray.length !== 0) {
          // console.log(getChildrenReturnArray.toString());
          // console.log("addedFlag before addAsParent is:"+addedFlag);
          addedFlag = addAsParent(element, getChildrenReturnArray, addedFlag)
          // console.log("addedFlag after addAsParent is:"+addedFlag);
        }

        // check if element is a child
        var getParentReturn = getParent(element.id, menuParentChildResult)

        if (getParentReturn != null) {
          // console.log("addedFlag before addAsChild is:"+addedFlag);
          addedFlag = addAsChild(element, getParentReturn, addedFlag)
          // console.log("addedFlag after addAsChild is:"+addedFlag);
        }

        if (addedFlag === 0) {
          // no parent child relationship
          addElement(element)
        }
      })

      if (returnObject.length === 0) {
        res.json({
          'state': 'failure',
          'state_description': 'failure-menu-data'
        })
      } else {
        res.json({
          'state': 'success',
          'state_description': 'success-menu-data',
          'data': returnObject
        })
      }
    }).catch(function (err) {
      // handle error
      console.log('Error occurred in obtaining results from menuParentChildren.' + err)

      res.json({
        'state': 'error',
        'state_description': 'error-menu-data'
      })
    })
  }).catch(function (err) {
    // handle error
    console.log('Error occurred in obtaining results from menuData matching entity and menuType.\nError(node): ' + err)
  })
})

module.exports = router
