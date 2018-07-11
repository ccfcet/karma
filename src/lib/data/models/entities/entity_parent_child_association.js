module.exports = function (sequelize, DataTypes) {
  const EntityParentChildAssociation = sequelize
    .define('entity_parent_child_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
      child_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
    });

  EntityParentChildAssociation.associate = function (models) {
    models.entities.entity_parent_child_association
      .belongsTo(models.entities.entities, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'parent_id',
        // allowNull: false -- already defined
        },
      });

    models.entities.entity_parent_child_association
      .belongsTo(models.entities.entities, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'child_id',
        // allowNull: false -- already defined
        },
      });
  };

  return EntityParentChildAssociation;
};
