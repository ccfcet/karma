'use strict'

module.exports = function (sequelize, DataTypes) {
  var AuthenticationInformationLocal = sequelize.define('authentication_information_local', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    people_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  })

  return AuthenticationInformationLocal
}
