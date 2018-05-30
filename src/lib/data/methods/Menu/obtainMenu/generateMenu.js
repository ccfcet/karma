var Promise = require('bluebird')

var beautifyMenu = require('./beautifyMenu')
var combineMenuElementsUsingMenuParentChildAssociations =
require('./combineMenuElementsUsingMenuParentChildAssociations')
var correctMenuElementPositions = require('./correctMenuElementPositions')

// function to generate sorted menu from menuElements and
// menuParentChildAssociations
var generateMenu = function (menuElements, menuParentChildAssociations) {
  return new Promise(function (resolve, reject) {
    combineMenuElementsUsingMenuParentChildAssociations(
      menuElements, menuParentChildAssociations).then(function (combinedMenu) {
      correctMenuElementPositions(combinedMenu)
        .then(function (positionCorrectedMenu) {
          // position correction not implemented as of now
          beautifyMenu(positionCorrectedMenu).then(function (beautifiedMenu) {
            resolve(beautifiedMenu)
          }).catch(function (err) {
            // handle error
            console.log(err)
            reject(err)
          })
          resolve(positionCorrectedMenu)
        }).catch(function (err) {
        // handle error
          console.log(err)
          reject(err)
        })
    }).catch(function (err) {
      // handle error
      console.log(err)
      reject(err)
    })
  })
}

module.exports = generateMenu
