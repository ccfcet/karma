var Promise = require('bluebird')
var _ = require('lodash')

var loopThroughMenuItems = require('./loopThroughMenuItems')

var beautifyMenu = function (dirtyMenu) {
  return new Promise(function (resolve, reject) {
    var pick = function (menuElement) {
      return _.pick(menuElement, ['item_name', 'item_url', 'children'])
    }
    loopThroughMenuItems(dirtyMenu, pick).then(function (beautifiedMenu) {
      resolve(beautifiedMenu)
    }).catch(function (err) {
      // handle error
      console.log(err)
      reject(err)
    })
  })
}

module.exports = beautifyMenu
