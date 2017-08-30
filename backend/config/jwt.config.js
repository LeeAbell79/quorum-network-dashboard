module.exports = {
  saltRounds : 10,
  jwtSecret: 'JWT_SECRET_PLACEHOLDER', //to be generated on first-run (init script)
  jwtAlgorithm: 'HS512',
  jwtValidity: 14, //in days
  resetTokenValidity: 2, //in hours
  authCookieName: 'networkDashboardAuth',
  authCookieSecure: false,
  authCookieDomain: '', //if backend hosted on a domain different from the frontend
};