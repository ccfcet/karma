const Promise = require('bluebird');

const beautifyMenu = require('./beautifyMenu');
const combineMenuElementsUsingMenuParentChildAssociations = require(
  './combineMenuElementsUsingMenuParentChildAssociations',
);
const correctMenuElementPositions = require('./correctMenuElementPositions');

// function to generate sorted menu from menuElements and
// menuParentChildAssociations
const generateMenu = function (menuElements, menuParentChildAssociations) {
  return new Promise(((resolve, reject) => {
    combineMenuElementsUsingMenuParentChildAssociations(
      menuElements, menuParentChildAssociations,
    ).then((combinedMenu) => {
      correctMenuElementPositions(combinedMenu)
        .then((positionCorrectedMenu) => {
          // position correction not implemented as of now
          beautifyMenu(positionCorrectedMenu).then((beautifiedMenu) => {
            resolve(beautifiedMenu);
          }).catch((err) => {
            // handle error
            console.log(err);
            reject(err);
          });
          resolve(positionCorrectedMenu);
        }).catch((err) => {
        // handle error
          console.log(err);
          reject(err);
        });
    }).catch((err) => {
      // handle error
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = generateMenu;
