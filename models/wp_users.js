/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wpUsers', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    userLogin: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
      field: 'user_login'
    },
    userPass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      field: 'user_pass'
    },
    userNicename: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      field: 'user_nicename'
    },
    userEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      field: 'user_email'
    },
    userUrl: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      field: 'user_url'
    },
    userRegistered: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'user_registered'
    },
    userActivationKey: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      field: 'user_activation_key'
    },
    userStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'user_status'
    },
    displayName: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: '',
      field: 'display_name'
    }
  }, {
    tableName: 'wp_users'
  });
};
