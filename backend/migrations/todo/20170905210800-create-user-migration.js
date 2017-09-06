'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {type: Sequelize.STRING, allowNull: false, unique: true, validate: {isEmail: true}},
        passwordHash: {type: Sequelize.STRING, allowNull: false},
        confirmationToken: {type: Sequelize.STRING},
        confirmationTokenExpiry: {type: Sequelize.DATE},
        resetToken: {type: Sequelize.STRING},
        resetTokenExpiry: {type: Sequelize.DATE},
        isConfirmed: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
