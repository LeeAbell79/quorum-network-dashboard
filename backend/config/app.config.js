module.exports = {
  saltRounds : 10,
  jwtSecret: 'JWT_SECRET_PLACEHOLDER', //to be generated on first-run (init script)
  jwtAlgorithm: 'HS512',
  jwtValidity: 14, //in days
  resetTokenValidity: 2, //in hours
  authCookieName: 'networkDashboardAuth',
  authCookieSecure: false,
  authCookieDomain: process.env['HOST_NAME'] || '', //if backend hosted on a domain different from the frontend,
  domainWhiteList: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000'
  ],
  emailConfig: {
    'sendgridUsername': 'apikey',
    'sendgridToken': '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',
    'from': '"Quorum network" <nikitam+quorumgov@blockapps.net>',// 'from': '"Quorum network" <quorumadmin@example.com>',
    'notificationSubject': 'Quorum network invitation',
    'notificationText': 'Hi,\nYou have been invited to join the Quorum Network: Example Network. If you have not requested to join please ignore this email. If you have expecting this email please visit the link below and follow the onboarding instructions.\nOnboard with the network: URL_HERE/invite/{TOKEN}\nThe contents of this email are confidential',
    'notificationHTML': 'Hi,<br/><p>You have been invited to join the Quorum Network: Example Network. If you have not requested to join please ignore this email. If you have expecting this email please click the link below and follow the onboarding instructions.</p><p>Onboard with the network: <a href="URL_HERE/invite/{TOKEN}">Click here</a></p><p>The contents of this email are confidential</p>',
  },
};