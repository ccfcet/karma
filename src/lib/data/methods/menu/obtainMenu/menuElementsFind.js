const Promise = require('bluebird');

const models = require('../../../models');

// function to obtain rows from the table menu_elements matching menu_id
const menuElementsFind = function (menuId) {
  return new Promise(((resolve, reject) => {
    models.menu.menu_elements.findAll({
      raw: true,
      where: { menu_id: menuId },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      // handle error
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = menuElementsFind;
