var Promise = require('bluebird')
var _ = require('lodash')
var util = require('util')

var processMenuElement = function (menuElement, index, menuElements, iteratee) {
  return new Promise(async function (resolve, reject) {
    if (menuElement.children != null) {
      menuElement.children = await loopThroughMenuItems(menuElement.children, iteratee)
    }
    console.log('menuElement' + util.inspect(menuElement))
    menuElement = iteratee(menuElement)
    console.log('menuElement' + util.inspect(menuElement))
    menuElements[index] = menuElement
    resolve(menuElements)
  })
}

var loopThroughMenuItems = function (menuElements, iteratee) {
  return new Promise(async function (resolve, reject) {
    var promisesArray = []

    _.forEach(menuElements, async function (menuElement, index, menuElements) {
      promisesArray.push(processMenuElement(menuElement, index, menuElements, iteratee))
    })

    Promise.all(promisesArray).then(function () {
      console.log('menuElements' + util.inspect(menuElements))
      resolve(menuElements)
    })
  })
}

module.exports = loopThroughMenuItems
