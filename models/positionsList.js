"use strict";

module.exports = function(sequelize, DataTypes) {
    var PositionsList = sequelize.define("positionsList", {
            pid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pname: {
                type: DataTypes.STRING(100),
                unique: true,
                allowNull: false
            }
          });

    return PositionsList;
}
