"use strict";

module.exports = function(sequelize, DataTypes) {
  var Entities = sequelize.define("entities", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ename: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  });

  return Entities;
}
