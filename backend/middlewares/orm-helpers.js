const models = require('../models');

module.exports = {
  /**
   * Check if user has role by his id
   * @param userId: user id (e.g. from req.user.id)
   * @param roleName: name of the role (e.g. 'admin')
   * @param next: express next obj (for error handling)
   * return Promise(boolean)
   */
  checkRoleById: (userId, roleName, next) => {
    return models.User.findById(
      userId,
      {
        include: [{model: models.Role}],
      }
    ).then(user => {
      if (!user) {
        return next(new Error('unknown user id'));
      } else {
        return user.Roles.map(roleObj => roleObj.dataValues.name).includes(roleName);
      }
    })
  }
};