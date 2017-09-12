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
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = 'http://' + url;
    }
    return {
      UserId: userId,
      name: name,
      url: url,
      publicKey: publicKey,
    }
  };

  return Node;
};
