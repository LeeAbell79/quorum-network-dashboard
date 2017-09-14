const models = require('../models');

module.exports = {
  list: function (req, res, next) {
    models.User.checkRoleById(req.user.id, 'admin').then(
      isAdmin => {
        if (!isAdmin) {
          let err = new Error('admin permissions needed');
          err.status = 403;
          return next(err);
        } else {
          // TODO: use .findAll({limit: 1,order: [[ 'createdAt', 'DESC' ]]}) ORM syntax for the query
          models.sequelize.query("SELECT \
            n.\"id\", \
            n.\"name\", \
            n.\"host\", \
            n.\"accountAddress\", \
            s.\"isConnected\", \
            s.\"peerCount\", \
            s.\"blockNumber\" \
            FROM \
              \"Nodes\" n \
            JOIN \
              \"Stats\" s \
            ON \
              s.\"NodeId\" = n.\"id\" \
              AND s.\"createdAt\" = ( \
                SELECT \
                  MAX(\"createdAt\") \
                FROM \
                  \"Stats\" \
                WHERE \
                  \"NodeId\"=n.\"id\"\
              )",
              { type: models.sequelize.QueryTypes.SELECT}
          )
          .then(nodes => {
            res.status(200).json({nodes : nodes});
          })
          .catch((err)=>{
            throw err;
          })
        }
      }
    );
  },

  create: function(req, res, next) {
    models.User.checkRoleById(req.user.id, 'admin').then(
      isAdmin => {
        if (!isAdmin) {
          let err = new Error('admin permissions needed');
          err.status = 403;
          return next(err);
        } else {
          const nodeName = req.body.name;
          const nodeHost = req.body.host;
          const nodePort = req.body.port;
          const nodeCPort = req.body.constellationPort;
          const nodeAccountAddress = req.body.accountAddress;
          const nodePublicKey = req.body.publicKey;

          // TODO: proper validation for each param
          if (! (nodeName && nodeHost && nodePort && nodeCPort && nodeAccountAddress && nodePublicKey)) {
            let err = new Error('all params are required and can\'t be empty string, 0 or null');
            err.status = 400;
            return next(err);
          }

          const nodeData = models.Node.prepareNodeData(req.user.id, nodeName, nodeHost, nodePort, nodeCPort, nodeAccountAddress, nodePublicKey);
          models.Node.create(nodeData).then(
            res => {
              res.status(200).json();
            }
          )
        }
      }
    )
  }
};
