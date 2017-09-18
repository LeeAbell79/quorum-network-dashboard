const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const moment = require('moment');
const randToken = require('rand-token');
const stringTemplate = require('string-template');

const appConfig = require('../config/app.config');
const authHandler = require('../middlewares/authHandler.js');
const models = require('../models');
const sendEmail = require('../middlewares/email-handler');


module.exports = {
  // Login can be executed by logged-in users and re-logins with new credentials provided
  login: function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      let err = new Error("wrong params, expected: {email, password}");
      err.status = 400;
      return next(err);
    }

    if (!emailValidator.validate(email)) {
      let err = new Error("email syntax error");
      err.status = 400;
      return next(err);
    }

    // Check if password provided for the user is correct
    models.User.findOne({
      where: {email: email},
      include: [{
        model: models.Role,
      }]
    }).then(user => {
      const authErrorText = "user does not exist or wrong user-password pair provided";
      if (!user) {
        let err = new Error(authErrorText);
        err.status = 401;
        return next(err);
      } else {
        bcrypt.compare(password, user['passwordHash'], function (err, passIsCorrect) {
          if (err) {
            return next(err);
          } else {
            if (!passIsCorrect) {
              let err = new Error(authErrorText);
              err.status = 401;
              return next(err);
            } else {
              let tokenData;
              try {
                tokenData = authHandler.issue(user);
              }
              catch(err) {
                return next(err);
              }

              res.cookie(
                appConfig.authCookieName,
                tokenData.token,
                {
                  domain: appConfig.authCookieDomain,
                  httpOnly: true,
                  secure: appConfig.authCookieSecure,
                  expire: moment(tokenData.expireDate).toDate()
                }
              );
              res.status(200).json({user: user.toJson()});
            }
          }
        });
      }
    });
  },

  logout: function (req, res) {
    res.clearCookie(appConfig.authCookieName);
    res.status(200).json({
      message: 'Logout successful'
    });
  },

  create: function(req, res, next) {
    const email = req.body['email'];
    const nodeName = req.body['nodeName'];
    const host = req.body['host'];

    if (!email || !nodeName || !host) {
      let err = new Error("wrong params, expected: {email, nodeName, host}");
      err.status = 400;
      return next(err);
    }

    if (!emailValidator.validate(email)) {
      let err = new Error("wrong email provided");
      err.status = 400;
      return next(err);
    }

    return new Promise((resolve, reject) => {
      models.User.findOne({where: {email: email}}).then(
        user => {
          if (user) {
            resolve(user);
          } else {
            models.User.create(
              {
                email: email,
                confirmationToken: randToken.generate(16),
                isConfirmed: false,
              }
            ).then(
              createdUser => {
                models.Role.findOne({
                  where: {
                    name: 'party'
                  }
                }).then(
                  partyRole => {
                    createdUser.addRole(partyRole).then(() => {
                      sendEmail(
                        {
                          from: appConfig.emailConfig.from,
                          to: createdUser.email,
                          subject: appConfig.emailConfig.notificationSubject,
                          text: stringTemplate(appConfig.emailConfig.notificationText, {TOKEN: createdUser.confirmationToken}),
                          html: stringTemplate(appConfig.emailConfig.notificationHTML, {TOKEN: createdUser.confirmationToken}),
                        }
                      ).then(
                        success => {
                          if (success) {
                            resolve(createdUser);
                          } else {
                            reject("invitation email could not been sent")
                          }
                        });
                    })
                  }
                )
              }
            )
          }
        }
      );
    }).then(
      user => {
        models.Node.create(
          models.Node.prepareNodeData(user.id, nodeName, host)
        ).then(node => {
          res.status(200).json({node: node});
        }).catch(error => {
          if (error.name === "SequelizeUniqueConstraintError") {
            let err = new Error("Node with name provided already exists");
            err.status = 409;
            return next(err);
          }
          console.error(error);
        });

      }
    )

  },

  confirm: function(req, res, next) {
    const confirmationToken = req.body['confirmationToken'];
    const password = req.body['password'];

    if (!confirmationToken || !password) {
      let err = new Error("wrong params, expected: {confirmationToken, password}");
      err.status = 400;
      return next(err);
    }

    models.User.findAll({where: {confirmationToken: confirmationToken}}).then(result => {
      if (result.length > 1) {
        // TODO: slightly change the flow to handle theoretically possible token overlap
        console.error(`token overlap: ${confirmationToken}`)
      } else if (result.length < 1) {
        let err = new Error("Token not found");
        err.status = 404;
        return next(err);
      } else {
        const user = result[0];
        user.update(
          {
            passwordHash: bcrypt.hashSync(password, 10),
            confirmationToken: null,
            isConfirmed: true,
          },
          {fields: ['passwordHash', 'confirmationToken', 'isConfirmed']}
        ).then(user => {
          let tokenData;
          try {
            tokenData = jwtHandler.issue(user);
          }
          catch(err) {
            return next(err);
          }
          res.cookie(
            appConfig.authCookieName,
            tokenData.token,
            {
              domain: appConfig.authCookieDomain,
              httpOnly: true,
              secure: appConfig.authCookieSecure,
              expire: moment(tokenData.expireDate).toDate()
            }
          );
          res.status(200).json({message: "user confirmed successfully"})
        })
      }
    })
  },

};