module.exports = function (sequelize, DataTypes) {
  const EntityPositionAssociation = sequelize
    .define('entity_position_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      entity_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      position_name: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      position_slug: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      position_description: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },
    });

  EntityPositionAssociation.associate = function (models) {
    models.entities.entity_position_association
      .belongsTo(models.entities.entities, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'entity_id',
        // allowNull: false -- already defined
        },
      });
  };

  return EntityPositionAssociation;
};
