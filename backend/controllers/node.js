const models = require('../models');

module.exports = {
  list: function (req, res, next) {
    // TODO: use .findAll({limit: 1,order: [[ 'createdAt', 'DESC' ]]}) ORM syntax for the query
    models.sequelize.query("SELECT \
      n.\"id\", \
      n.\"name\", \
      n.\"host\", \
      n.\"isVerified\", \
      n.\"UserId\", \
      n.\"accountAddress\", \
      s.\"isConnected\", \
      s.\"peerCount\", \
      s.\"blockNumber\" \
      FROM \
        \"Nodes\" n \
      LEFT OUTER JOIN \
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
  },

  get: function(req,res,next) {
    const id = req.params.id;

    models.Node.findOne({
      where: {
        id: id
      }
    })
    .then((node) => {
      if(!node) {
        let err = new Error("Not found");
        err.status = 404;
        return next(err);
      }
      res.status(200).json({
        node: node
      });
    })
  },

  update: function (req, res, next) {
    const id = req.body['id'];
    const port = req.body['port'];
    const constellationPort = req.body['constellationPort'];
    const accountAddress = req.body['accountAddress'];
    const publicKey = req.body['publicKey'];

    if (!id || !port || !constellationPort || !accountAddress || !publicKey) {
      let err = new Error("wrong params, expected: {id, port, constellationPort, accountAddress, publicKey}");
      err.status = 400;
      return next(err);
    }

    const nodeNotFoundMsg = 'node with id provided was not found';

    // Check if user can change the node
    // TODO: refactor: the check should be the model class method
    new Promise((resolve, reject) => {
      models.User.findById(
        req.user.id,
        {
          include: [{model: models.Role}],
        }
      ).then(user => {
        if (!user) {
          next(new Error('unknown user id'));
        } else {
          const isAdmin = user.Roles.map(roleObj => roleObj.dataValues.name).includes('admin');
          if (!isAdmin) {
            models.Node.findById(id).then(node => {
              if (!node) {
                let err = new Error(nodeNotFoundMsg);
                err.status = 404;
                return next(err);
              } else {
                return resolve(node.dataValues.UserId === req.user.id);
              }
            });
          } else {
            return resolve(true);
          }
        }
      })
    }).then(hasAccess => {
      if (!hasAccess) {
        let err = new Error('you are not allowed to update the node with id provided');
        err.status = 403;
        return next(err);
      } else {
        models.Node.update(
          {
            port: port,
            constellationPort: constellationPort,
            accountAddress: accountAddress,
            publicKey: publicKey,
            isVerified: true,
          },
          {where: {id: id}}
        ).then(result => {
          if (result[0] > 0) {
            res.status(200).json({message: "node updated successfully"})
          } else {
            let err = new Error(nodeNotFoundMsg);
            err.status = 404;
            return next(err);
          }
        });
      }
    });
  }

  // create: function(req, res, next) {
  //   models.User.checkRoleById(req.user.id, 'admin').then(
  //     isAdmin => {
  //       if (!isAdmin) {
  //         let err = new Error('admin permissions needed');
  //         err.status = 403;
  //         return next(err);
  //       } else {
  //         const nodeName = req.body.name;
  //         const nodeHost = req.body.host;
  //         const nodePort = req.body.port;
  //         const nodeCPort = req.body.constellationPort;
  //         const nodeAccountAddress = req.body.accountAddress;
  //         const nodePublicKey = req.body.publicKey;
  //
  //         // TODO: proper validation for each param
  //         if (! (nodeName && nodeHost && nodePort && nodeCPort && nodeAccountAddress && nodePublicKey)) {
  //           let err = new Error('all params are required and can\'t be empty string, 0 or null');
  //           err.status = 400;
  //           return next(err);
  //         }
  //
  //         const nodeData = models.Node.prepareNodeData(req.user.id, nodeName, nodeHost, nodePort, nodeCPort, nodeAccountAddress, nodePublicKey);
  //         models.Node.create(nodeData).then(
  //           result => {
  //             res.status(200).json({message: "node created"});
  //           }
  //         )
  //       }
  //     }
  //   )
  // }
};
