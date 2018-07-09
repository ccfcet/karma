module.exports = function (sequelize, DataTypes) {
  const MediaRoleEntityAssociation = sequelize
    .define('media_role_entity_association', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      media_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
      role_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
      entity_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
    // implement [index6 specified in db design] compositeIndex when sequelize
    // supports it.
    // https://github.com/sequelize/sequelize/issues/8148
    });

  MediaRoleEntityAssociation.associate = function (models) {
    models.media.media_role_entity_association
      .belongsTo(models.media.media, {
        onDelete: 'CASCADE',
        targetkey: 'id',
        foreignKey: {
          name: 'media_id',
        // allowNull: false -- already defined
        },
      });

    models.media.media_role_entity_association
      .belongsTo(models.media.media_roles, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'role_id',
        // allowNull: false -- already defined
        },
      });

    models.media.media_role_entity_association
      .belongsTo(models.entities.entities, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'entity_id',
        // allowNull: false -- already defined
        },
      });
  };

  return MediaRoleEntityAssociation;
};
