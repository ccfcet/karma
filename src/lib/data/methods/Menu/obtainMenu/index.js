const Promise = require('bluebird');
const _ = require('lodash');

const generateMenu = require('./generateMenu');
const menuDataFind = require('./menuDataFind');
const menuElementsFind = require('./menuElementsFind');
const menuParentChildAssociationsFind = require(
  './menuParentChildAssociationsFind',
);

const obtainMenu = function (entitySlug, menuType) {
  return new Promise(((resolve, reject) => {
    menuDataFind(entitySlug, menuType).then((menuDataRow) => {
      const menuTitle = menuDataRow.menu_title;
      menuElementsFind(menuDataRow.id).then((menuElements) => {
        menuParentChildAssociationsFind(_.map(menuElements, _.property('id')))
          .then((menuParentChildAssociations) => {
            generateMenu(menuElements, menuParentChildAssociations)
              .then((combinedMenu) => {
              // resolve menuTitle and combinedMenu
                resolve({
                  title: menuTitle,
                  data: combinedMenu,
                });
              }).catch((err) => {
                console.log(err);
                reject(err);
              });
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = obtainMenu;
