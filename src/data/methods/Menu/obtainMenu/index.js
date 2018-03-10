var Promise = require('bluebird')
var _ = require('lodash')

var generateMenu = require('./generateMenu')
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
            generateMenu(menuElements, menuParentChildAssociations)
              .then(function (combinedMenu) {
              // return the combinedMenu
                resolve(combinedMenu)
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
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = obtainMenu
