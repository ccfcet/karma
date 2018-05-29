var Promise = require('bluebird')

var models = require('../../../models')

// function to obtain first row from the table menu_data matching entitySlug and
// menuType
var menuDataFind = function (entitySlug, menuType) {
  return new Promise(function (resolve, reject) {
    models.Menu.menu_data.findOne({
      raw: true,
      include: [
        {
          model: models.Entities.entities,
          attributes: [],
          where: { entity_slug: entitySlug }
        }
      ],
      where: { menu_type: menuType },
      rejectOnEmpty: true
    }).then(function (result) {
      resolve(result)
    }).catch(function (err) {
      // handle error
      console.log(err)
      reject(err)
    })
  })
}

module.exports = menuDataFind
