module.exports = function (sequelize, DataTypes) {
  const People = sequelize.define('people', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(63),
    },
    last_name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
  });

  People.associate = function (models) {
    models.people.people.hasMany(models.people.people_information, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'people_id',
        // allowNull: false -- already defined
      },
    });
  };

  return People;
};
