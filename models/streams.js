"use strict";

module.exports = function(sequelize, DataTypes) {
    var Streams = sequelize.define("streams", {
            sid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sname: {
                type: DataTypes.STRING(100),
                unique: true,
                allowNull: false
            }
        }, {
            classMethods: {
                associate: function(models) {
                    models.streams.belongsTo(models.programmes, { foreignKey: 'pid', targetKey: 'pid' }); //Admin is the target model--automatically created a foreign key
                    models.streams.belongsTo(models.entities, { foreignKey: 'eid', targetKey: 'eid' }); //Admin is the target model--automatically created a foreign key
                }
            }

        }
        // EIDs
        // ------------
        // 0 - college
        //1 -cse
        //2- ece

    );

    return Streams;
}