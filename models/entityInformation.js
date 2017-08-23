"use strict";

module.exports = function(sequelize, DataTypes) {
    var EntityInformation = sequelize.define("entityInformation", {
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
                    models.entityInformation.belongsTo(models.entities, { foreignKey: 'entityEid' });
                    models.entityInformation.belongsTo(models.entitySlugs, { foreignKey: 'entitySlugSlugId' });
            }
        }
      });

        // EIDs
        // ------------
        // 0 - college
        // 1 - cse
        // 2 - ece

    return EntityInformation;
}
