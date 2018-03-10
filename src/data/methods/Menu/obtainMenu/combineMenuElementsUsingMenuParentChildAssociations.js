var Promise = require('bluebird')
var _ = require('lodash')

var reflectParentChildAssociation = require('./reflectParentChildAssociation')

var combineMenuElementsUsingMenuParentChildAssociations = function (
  menuElements, menuParentChildAssociations) {
  return new Promise(function (resolve, reject) {
    _.forEach(menuParentChildAssociations, async function
      (menuParentChildAssociation) {
      await reflectParentChildAssociation(menuElements,
        menuParentChildAssociation.parent_id,
        menuParentChildAssociation.child_id)
    })
    resolve(menuElements)
  })
}

module.exports = combineMenuElementsUsingMenuParentChildAssociations
