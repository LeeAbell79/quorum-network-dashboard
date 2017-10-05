module.exports = {
  initialUserName: 'admin@example.com',
  defaultWeiTransfer: '1000000',
  passwordSaltRounds : 10,
  jwtConfig: {
    jwtSecret: 'JWT_SECRET_PLACEHOLDER', // random string
    jwtAlgorithm: 'HS512',
    jwtValidity: 14, //in days
    authCookieName: 'networkDashboardAuth',
    authCookieSecure: false,
    authCookieDomain: process.env['HOST_NAME'] || '', //if backend hosted on a domain different from the frontend,
    // Development usage only
    domainWhiteList: [
      'http://localhost:3000',
      'http://localhost:3001'
    ],
  },
  emailConfig: {
    sendgridUsername: 'apikey',
    sendgridToken: '<YOUR_SENDGRID_TOKEN_HERE>',
    from: '"Quorum network" <admin@example.com>',
    notificationSubject: 'Quorum network invitation',
    notificationText: 'Hi,\nYou have been invited to join the Quorum Network: Example Network. If you have not requested to join please ignore this email. If you were expecting this email please visit the link below and follow the onboarding instructions.\nOnboard with the network: http://localhost/#/invite/{TOKEN}\nThe contents of this email are confidential',
    notificationHTML: 'Hi,<br/><p>You have been invited to join the Quorum Network: Example Network. If you have not requested to join please ignore this email. If you were expecting this email please click the link below and follow the onboarding instructions.</p><p>Onboard with the network: <a href="http://localhost/#/invite/{TOKEN}">http://localhost/#/invite/{TOKEN}</a></p><p>The contents of this email are confidential</p>',
  },

};
