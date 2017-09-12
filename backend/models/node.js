'use strict';

module.exports = function(sequelize, DataTypes) {
  let Node = sequelize.define('Node', {
    name: {type: DataTypes.STRING, allowNull: false},
    url: {type: DataTypes.STRING},
    publicKey: {type: DataTypes.STRING},
  });

  Node.associate = function(models) {
    Node.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Node.hasMany(models.Stat);
  };

  Node.prepareNodeData = (userId, name, url, publicKey=null) => {
    return {
      UserId: userId,
      name: name,
      url: url,
      publicKey: publicKey,
    }
  };

  Node.prototype.toJson = function() {
    return {
      name: this.name,
      url: this.url,
      publicKey: this.publicKey
    }
  };

  return Node;
};
