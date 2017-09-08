const bcrypt = require('bcrypt');
const exec = require('child_process').exec;
const moment = require('moment');

const appConfig = require('../config/app.config');
const jwtHandler = require('../middlewares/jwt-handler.js');
const models = require('../models');


const quorumScriptsDir = 'quorum/scripts';

module.exports = {
  startNetwork: function (req, res, next) {
    models.User.findById(
      req.user.id,
      {
        include: [{model: models.Role}],
      }
    ).then(user => {
      if (!user) {
        return next(new Error());
      } else {
        if (!'admin' in user.Roles.map(roleObj => roleObj.dataValues.name)) {
          let err = new Error('admin permissions needed');
          err.status = 403;
          return next(err);
        } else {
          // TODO: refactor
          errorIfNetworkRunning();
          runNetwork();
        }
      }
    });

    const errorIfNetworkRunning = () => {
      exec(`sh ./${quorumScriptsDir}/check-network-running.sh`, function (error, stdout, stderr) {
        if (error) {
          if (error.code > 1) {
            console.error(error.code);
            return next(new Error());
          } else {
            let err = new Error('network is already running');
            err.status = 409;
            return next(err);
          }
        }
      });
    };

    const runNetwork = () => {
      exec(`sh ./${quorumScriptsDir}/check-network-running.sh`, function (error, stdout, stderr) {
        // TODO: docker-compose needs to be installed in docker image
        // TODO: finish the func:
        // if (error) {
        //   if (error.code > 1) {
        //     console.error(error.code);
        //     return next(new Error());
        //   } else {
        //     let err = new Error('network is already running');
        //     err.status = 409;
        //     return next(err);
        //   }
        // }
      });
    };
  },

};