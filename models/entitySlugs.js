"use strict";

module.exports = function(sequelize, DataTypes) {
    var EntitySlugs = sequelize.define("entitySlugs", {
        slugId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        slugName: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        }
        // EIDs
        // ------------
        // 0 - college
        //1 -cse
        //2- ece

    }, {
        classMethods: {
            associate: function(models) {
                // models.entities.hasMany(models.information, { foreignKey: 'eid', targetKey: 'eid' }); //Admin is the target model--automatically created a foreign key
                  models.entitySlugs.hasMany(models.entityInformation);
                  // models.entities.hasMany(models.information);
            }
        }
    });

    return EntitySlugs;
}
