const Promise = require('bluebird');
const _ = require('lodash');

const reflectParentChildAssociation = require(
  './reflectParentChildAssociation',
);

const combineMenuElementsUsingMenuParentChildAssociations = function (
  menuElements, menuParentChildAssociations,
) {
  return new Promise(((resolve, reject) => {
    try {
      _.forEach(menuParentChildAssociations,
        async (menuParentChildAssociation) => {
          await reflectParentChildAssociation(menuElements,
            menuParentChildAssociation.parent_id,
            menuParentChildAssociation.child_id);
        });
      resolve(menuElements);
    } catch (err) {
      reject(err);
    }
  }));
};

module.exports = combineMenuElementsUsingMenuParentChildAssociations;
