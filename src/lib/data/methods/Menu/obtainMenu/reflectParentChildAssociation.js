const Promise = require('bluebird');
const _ = require('lodash');

const reflectParentChildAssociation = function (
  menuElements,
  parentId,
  childId,
) {
  return new Promise((resolve, reject) => {
    try {
      const childElements = _.remove(
        menuElements,
        menuElement => menuElement.id === childId,
      );
      const childElement = childElements[0];
      const parentElement = _.find(
        menuElements,
        menuElement => menuElement.id === parentId,
      );
      if (parentElement.children) {
        parentElement.children.push(childElement);
      } else {
        parentElement.children = [childElement];
      }
      resolve(menuElements);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = reflectParentChildAssociation;
