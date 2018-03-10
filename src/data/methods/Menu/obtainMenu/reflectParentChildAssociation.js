var Promise = require('bluebird')
var _ = require('lodash')

var reflectParentChildAssociation = function (menuElements, parentId, childId) {
  return new Promise(function (resolve, reject) {
    var childElements = _.remove(menuElements, function (menuElement) {
      return menuElement.id === childId
    })
    var childElement = childElements[0]
    var parentElement = _.find(menuElements, function (menuElement) { return menuElement.id === parentId })
    if (parentElement.children) {
      parentElement.children.push(childElement)
    } else {
      parentElement.children = [childElement]
    }
    resolve(menuElements)
  })
}

module.exports = reflectParentChildAssociation
