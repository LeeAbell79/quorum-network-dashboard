'use strict';

module.exports = function(sequelize, DataTypes) {
  let Node = sequelize.define('Node', {
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    host: {type: DataTypes.STRING, allowNull: false},
    port: {type: DataTypes.INTEGER},
    constellationPort: {type: DataTypes.INTEGER},
    accountAddress: {type: DataTypes.STRING},
    publicKey: {type: DataTypes.STRING},
    isVerified: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
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

  Node.prepareNodeData = (userId, name, host, port=null, constellationPort=null, accountAddress=null, publicKey=null, isVerified=false) => {
    host = !host.match(/^[a-zA-Z]+:\/\//) ? `http://${host}` : host;
    return {
      UserId: userId,
      name: name,
      host: host,
      port: port,
      constellationPort: constellationPort,
      accountAddress: accountAddress,
      publicKey: publicKey,
      isVerified: isVerified,
    }
  };

  return Node;
};
