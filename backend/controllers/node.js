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
          console.log(models);
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
};
