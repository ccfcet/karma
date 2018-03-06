'use strict'

module.exports = function (sequelize, DataTypes) {
  var StreamTypes = sequelize.define('stream_types', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    stream_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE(),
      allowNull: false
    }
  })

  return StreamTypes
}
