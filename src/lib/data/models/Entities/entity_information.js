module.exports = function (sequelize, DataTypes) {
  const EntityInformation = sequelize.define('entity_information', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    entity_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    slug_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      unique: 'compositeIndex',
    },
    data: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
  });

  EntityInformation.associate = function (models) {
    models.Entities.entity_information
      .belongsTo(models.Entities.entities, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'entity_id',
        // allowNull: false -- already defined
        },
      });

    models.Entities.entity_information
      .belongsTo(models.Entities.entity_information_slugs, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'slug_id',
        // allowNull: false -- already defined
        },
      });
  };

  return EntityInformation;
};
