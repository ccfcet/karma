var models = require('../../models')

// function to obtain rows from the table menu_elements matching menu_id
var menuElementsFind = function (menuId) {
  return new Promise(function (resolve, reject) {
    models.Menu.menu_elements.findAll({
      raw: true,
      where: { menu_id: menuId }
    }).then(function (result) {
      resolve(result)
    }).catch(function (err) {
      // handle error
      console.log(err)
      reject(err)
    })
  })
}

module.exports = menuElementsFind
