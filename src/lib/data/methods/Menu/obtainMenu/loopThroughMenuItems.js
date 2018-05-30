var Promise = require('bluebird')
var _ = require('lodash')

var processMenuElement = function (menuElement, index, menuElements, iteratee) {
  return new Promise(function (resolve, reject) {
    if (menuElement.children != null) {
      loopThroughMenuItems(menuElement.children, iteratee).then(function (result) {
        menuElement.children = result
        menuElement = iteratee(menuElement)
        menuElements[index] = menuElement
        resolve(menuElements)
      })
    } else {
      menuElement = iteratee(menuElement)
      menuElements[index] = menuElement
      resolve(menuElements)
    }
  })
}

var loopThroughMenuItems = function (menuElements, iteratee) {
  return new Promise(function (resolve, reject) {
    var promisesArray = []

    _.forEach(menuElements, function (menuElement, index, menuElements) {
      promisesArray.push(processMenuElement(menuElement, index, menuElements, iteratee))
    })

    Promise.all(promisesArray).then(function () {
      resolve(menuElements)
    })
  })
}

module.exports = loopThroughMenuItems
