"use strict";

module.exports = function(sequelize, DataTypes) {
  var PositionsList = sequelize.define("positionsList", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    position_name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  });

  return PositionsList;
}
