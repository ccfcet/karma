const Promise = require('bluebird');
const _ = require('lodash');
const processMenuElement = require('./processMenuElement');

const loopThroughMenuItems = function (menuElements, iteratee) {
  return new Promise(((resolve, reject) => {
    const promisesArray = [];

    // eslint-disable-next-line no-shadow
    _.forEach(menuElements, (menuElement, index, menuElements) => {
      promisesArray.push(processMenuElement(
        menuElement,
        index,
        menuElements,
        iteratee,
      ));
    });

    Promise.all(promisesArray).then(() => {
      resolve(menuElements);
    }).catch((err) => {
      // does it really throw here?
      reject(err);
    });
  }));
};

module.exports = loopThroughMenuItems;
