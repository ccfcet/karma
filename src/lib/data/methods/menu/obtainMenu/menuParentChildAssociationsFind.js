const Promise = require('bluebird');

const Sequelize = require('sequelize');

const models = require('../../../models');

// is this right?
const { Op } = Sequelize;

// function to obtain rows from the table menu_parent_child_associations
// matching either parent_id or child_id
const menuParentChildAssociationsFind = function (ids) {
  return new Promise(((resolve, reject) => {
    models.menu.menu_parent_child_associations.findAll({
      raw: true,
      where: {
        [Op.and]: [{ parent_id: { [Op.in]: ids } },
          { child_id: { [Op.in]: ids } }],
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      // handle error
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = menuParentChildAssociationsFind;
