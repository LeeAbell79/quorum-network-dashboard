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
          models.Node.findAll({
            include: [{
              model: models.Stat,
            }]
          })
          .then(nodes => {
            res.status(200).json({nodes : nodes});
          })
        }
      }
    );
  },
};
