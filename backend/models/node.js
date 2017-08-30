'use strict';

module.exports = function(sequelize, DataTypes) {
  let Node = sequelize.define('Node', {
    name: {type: DataTypes.STRING, allowNull: false},
    url: {type: DataTypes.STRING},
    nodeState: {type: DataTypes.INTEGER, allowNull: false},
    publicKey: {type: DataTypes.STRING},
  });

  Node.associate = function(models) {
    Node.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };

  return Node;
};