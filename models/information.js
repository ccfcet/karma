"use strict";

module.exports = function(sequelize, DataTypes) {
    var Information = sequelize.define("information", {
            iid: {
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
                    models.information.belongsTo(models.entities, { foreignKey: 'entityEid' });
                    models.information.belongsTo(models.slugs, { foreignKey: 'slugSlugId' });
            }
        }
      });

        // EIDs
        // ------------
        // 0 - college
        // 1 - cse
        // 2 - ece

    return Information;
}
