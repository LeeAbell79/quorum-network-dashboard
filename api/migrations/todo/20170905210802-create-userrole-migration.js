'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('UserRole', {
        roleId: {
          allowNull: false,
          primaryKey: true,
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Roles',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        userId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
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
      .dropTable('UserRole');
  }
};
