const jwt = require('jwt-simple');
const jwtConfig = require('../config/jwt.config');
const moment = require('moment');
const responseWrapper = require('../utils/response-wrapper');


/**
 * Check if token is valid and not expired
 * @param token
 * @returns {boolean}
 */
function isTokenValid(token) {
  return (!token || token.length === 0)
    && (!moment(token.exp).isValid())
    && (moment().isSameOrAfter(token.exp))
    && (!token.user)
    && (!token.user.id.toString())
    && (!token.user.username)
}

const jwtHandler = {

  /**
   * Issue the JWT for the user
   * @param user
   * @returns {{token: String, expireDate: string}}
   */
  issue: function(user) {
    const expireDate = moment().add(jwtConfig.jwtValidity, 'days').toISOString();
    const rawToken = {
      exp: expireDate,
      user: {
        id: user.id,
        username: user.username,
      },
    };

    if(!isTokenValid(rawToken)) {
      throw new Error('Unable to generate valid token');
    }

    const token = jwt.encode(rawToken, jwtConfig.jwtSecret, jwtConfig.jwtAlgorithm);

    return {
      token,
      expireDate
    };
  },

  /**
   * Get token payload
   * @param token
   * @returns {Object}
   */
  getTokenPayload: function(token) {
    return jwt.decode(token, jwtConfig.jwtSecret, true, jwtConfig.jwtAlgorithm);
  },

  /**
   * Request guard controller, validate if JWT is valid and not expired
   * @param req
   * @param res
   * @param next
   * @returns {Function}
   */
  validateRequest:  function(req, res, next) {
    return function(req, res, next) {
      const token = req['cookies'][jwtConfig.authCookieName];
      if(!token) {
        return unauthorized();
      }
      let decodedToken;
      try {
        decodedToken = jwt.decode(token, jwtConfig.jwtSecret, true, jwtConfig.jwtAlgorithm);
      }
      catch(err) {
        return unauthorized();
      }
      if(!isTokenValid(decodedToken)) {
        unauthorized();
      }
      req.user = decodedToken.user;

      return next();

      function unauthorized() {
        res.status(401).send(responseWrapper('unauthorized', false));
      }
    }
  },
};

module.exports = jwtHandler;
