'use strict';
module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    email: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true}},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
    confirmationToken: {type: DataTypes.STRING},
    confirmationTokenExpiry: {type: DataTypes.DATE},
    resetToken: {type: DataTypes.STRING},
    resetTokenExpiry: {type: DataTypes.DATE},
    isConfirmed: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
  });

  User.associate = function(models) {
    User.belongsToMany(models.Role, {through: 'UserRole'});
  };
  return User;
};