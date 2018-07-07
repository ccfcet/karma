const Promise = require('bluebird');
const _ = require('lodash');

const loopThroughMenuItems = require('./loopThroughMenuItems');

const beautifyMenu = function (dirtyMenu) {
  return new Promise(((resolve, reject) => {
    const pick = function (menuElement) {
      return _.pick(menuElement, ['item_name', 'item_url', 'children']);
    };
    loopThroughMenuItems(dirtyMenu, pick).then((beautifiedMenu) => {
      resolve(beautifiedMenu);
    }).catch((err) => {
      // handle error
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = beautifyMenu;
