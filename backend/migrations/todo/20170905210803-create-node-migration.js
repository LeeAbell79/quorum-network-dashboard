'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Nodes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {type: Sequelize.STRING, allowNull: false},
        url: {type: Sequelize.STRING},
        nodeState: {type: Sequelize.INTEGER, allowNull: false},
        publicKey: {type: Sequelize.STRING},
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        UserId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Nodes');
  }
};
