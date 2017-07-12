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
                    models.information.belongsTo(models.entities, { foreignKey: 'eid', targetKey: 'eid' }); //Admin is the target model--automatically created a foreign key
                    models.information.belongsTo(models.slugs, { foreignKey: 'slugId', targetKey: 'slugId' }); //Admin is the target model--automatically created a foreign key
                }
            }
        }
        // EIDs
        // ------------
        // 0 - college
        //1 -cse
        //2- ece

    );

    return Information;
}