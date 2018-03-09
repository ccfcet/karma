var _ = require('lodash')
var menuDataFind = require('./menuDataFind')
var menuElementsFind = require('./menuElementsFind')
var menuParentChildAssociationsFind =
require('./menuParentChildAssociationsFind')

var obtainMenu = function (entitySlug, menuType) {
  return new Promise(function (resolve, reject) {
    menuDataFind(entitySlug, menuType).then(function (menuDataRow) {
      menuElementsFind(menuDataRow.id).then(function (menuElements) {
        menuParentChildAssociationsFind(_.map(menuElements, _.property('id')))
          .then(function (menuParentChildAssociations) {
            resolve({
              menuElements: menuElements,
              menuParentChildAssociations: menuParentChildAssociations
            })
            // _.forEach(menuElements, function (element) {
            //   var addedFlag = 0
            //
            //   // check if element is a parent
            //   var getChildrenReturnArray = getChildren(element.id, menuParentChildAssociations)
            //
            //   if (getChildrenReturnArray.length !== 0) {
            //     addedFlag = addAsParent(returnObject, element, getChildrenReturnArray, addedFlag)
            //   }
            //
            //   // check if element is a child
            //   var getParentReturn = getParent(element.id, menuParentChildAssociations)
            //
            //   if (getParentReturn != null) {
            //     addedFlag = addAsChild(returnObject, element, getParentReturn, addedFlag)
            //   }
            //
            //   if (addedFlag === 0) {
            //   // no parent child relationship
            //     addElement(returnObject, element)
            //   }
            //
            //   console.log(association)
            // })
          }).catch(function (err) {
            console.log(err)
            reject(err)
          })
      }).catch(function (err) {
        console.log(err)
        reject(err)
      })
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = obtainMenu
