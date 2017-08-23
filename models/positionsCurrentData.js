"use strict";

module.exports = function(sequelize, DataTypes) {
    var PositionsCurrentData = sequelize.define("positionsCurrentData", {
            pid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                type: DataTypes.TEXT
            }
        }, {
            classMethods: {
                associate: function(models) {
                    models.positionsCurrentData.belongsTo(models.positionsList, { foreignKey: 'positionsListPid' });
                    models.positionsCurrentData.belongsTo(models.people, { foreignKey: 'personPid' });
            }
        }
      });

        // EIDs
        // ------------
        // 0 - college
        // 1 - cse
        // 2 - ece

    return PositionsCurrentData;
}
