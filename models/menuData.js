"use strict";

module.exports = function(sequelize, DataTypes) {
    var MenuData = sequelize.define("menuData", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            parentID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            itemName: {
                type: DataTypes.STRING(100),
                unique: true,
                allowNull: false
            },
            itemUrl: {
                type: DataTypes.STRING(320),
                unique: true,
                allowNull: false
            }
        }, {
            classMethods: {
                associate: function(models) {
                    models.menuData.belongsTo(models.entities, { foreignKey: 'entityEid' });
                }
            }

        }
    );

    return MenuData;
}
