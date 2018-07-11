module.exports = function (sequelize, DataTypes) {
  const AuthenticationInformationLocal = sequelize
    .define('authentication_information_local', {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      people_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

  AuthenticationInformationLocal.associate = function (models) {
    models.authentication.authentication_information_local
      .belongsTo(models.people.people, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'people_id',
        // allowNull: false -- already defined
        },
      });
  };

  return AuthenticationInformationLocal;
};
