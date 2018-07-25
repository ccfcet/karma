const Promise = require('bluebird');
const _ = require('lodash');
const models = require('../../models');

const menuMethods = {};

menuMethods.addMenu = data => new Promise((resolve, reject) => {
  models.menu.menu_data.create(data)
    .then((menuData) => {
      if (!_.isEmpty(menuData)) {
        resolve(menuData);
      } else {
        reject(new Error('Menu details could not be inserted '
                    + 'into the database'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

menuMethods.deleteMenuById = id => new Promise((resolve, reject) => {
  models.menu.menu_data.delete({
    where: {
      id,
    },
  })
    .then((noOfRowsDeleted) => {
      if (noOfRowsDeleted === 0) {
        reject(new Error('No rows were deleted from the '
                    + ' database.'));
      }
      resolve(noOfRowsDeleted);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = menuMethods;
