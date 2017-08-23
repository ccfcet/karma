"use strict";

module.exports = function(sequelize, DataTypes) {
    var PeopleSlugs = sequelize.define("peopleSlugs", {
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
                  models.peopleSlugs.hasMany(models.peopleInformation);
                  // models.entities.hasMany(models.information);
            }
        }
    });

    return PeopleSlugs;
}
