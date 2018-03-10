var Promise = require('bluebird')

var Sequelize = require('sequelize')

var models = require('../../../models')

const Op = Sequelize.Op

// function to obtain rows from the table menu_parent_child_associations
// matching either parent_id or child_id
var menuParentChildAssociationsFind = function (ids) {
  return new Promise(function (resolve, reject) {
    models.Menu.menu_parent_child_associations.findAll({
      raw: true,
      where: { [Op.and]: [{parent_id: {[Op.in]: ids}},
        {child_id: {[Op.in]: ids}}] }
    }).then(function (result) {
      resolve(result)
    }).catch(function (err) {
      // handle error
      console.log(err)
      reject(err)
    })
  })
}

module.exports = menuParentChildAssociationsFind
