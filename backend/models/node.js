'use strict';

module.exports = function(sequelize, DataTypes) {
  let Node = sequelize.define('Node', {
    name: {type: DataTypes.STRING, allowNull: false},
    host: {type: DataTypes.STRING},
    port: {type: DataTypes.INTEGER},
    constellationPort: {type: DataTypes.INTEGER},
    accountAddress: {type: DataTypes.STRING, allowNull: false},
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

  Node.prepareNodeData = (userId, name, host, port, constellationPort, accountAddress, publicKey=null) => {
    host = !host.match(/^[a-zA-Z]+:\/\//) ? `http://${host}` : host;
    return {
      UserId: userId,
      name: name,
      host: host,
      port: port,
      constellationPort: constellationPort,
      accountAddress: accountAddress,
      publicKey: publicKey,
    }
  };

  return Node;
};
