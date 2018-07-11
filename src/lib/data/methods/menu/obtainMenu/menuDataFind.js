const Promise = require('bluebird');

const models = require('../../../models');

// function to obtain first row from the table menu_data matching entitySlug and
// menuType
const menuDataFind = function (entitySlug, menuType) {
  return new Promise(((resolve, reject) => {
    models.menu.menu_data.findOne({
      raw: true,
      include: [
        {
          model: models.entities.entities,
          attributes: [],
          where: { entity_slug: entitySlug },
        },
      ],
      where: { menu_type: menuType },
      rejectOnEmpty: true,
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      // handle error
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = menuDataFind;
