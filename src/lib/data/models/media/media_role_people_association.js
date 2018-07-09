module.exports = function (sequelize, DataTypes) {
  const MediaRolePeopleAssociation = sequelize
    .define('media_role_people_association', {
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
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: 'compositeIndex',
      },
    // implement [index6 specified in db design] compositeIndex when sequelize
    // supports it.
    // https://github.com/sequelize/sequelize/issues/8148
    });

  MediaRolePeopleAssociation.associate = function (models) {
    models.Media.media_role_people_association.belongsTo(models.Media.media, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'media_id',
        // allowNull: false -- already defined
      },
    });

    models.Media.media_role_people_association
      .belongsTo(models.Media.media_roles, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'role_id',
        // allowNull: false -- already defined
        },
      });

    models.Media.media_role_people_association.belongsTo(models.People.people, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });
  };

  return MediaRolePeopleAssociation;
};
