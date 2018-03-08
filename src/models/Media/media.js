'use strict'

module.exports = function (sequelize, DataTypes) {
  var Media = sequelize.define('media', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    media_title: {
      type: DataTypes.VARCHAR(45),
      allowNull: false,
      unique: true
    },
    media_file_name: {
      type: DataTypes.VARCHAR(2048),
      allowNull: false
    },
    media_location: {
      type: DataTypes.VARCHAR(2048),
      allowNull: false
    }


  })



  return Media
}
