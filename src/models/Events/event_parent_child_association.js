'use strict'

module.exports = function (sequelize, DataTypes) {
  var eventParentChildAssociation = sequelize.define('event_parent_child_association', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    parent_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    child_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }

  })

/*no completed because parent child relation is not defined
*/
  return eventParentChildAssociation
}
