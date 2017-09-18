const nodemailer = require('nodemailer');
const emailConfig = require('../config/app.config').emailConfig;

const client = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: emailConfig.sendgridUsername,
    pass: emailConfig.sendgridToken
  }
});


/**
 * Send email
 * @param emailObject
 * example:
 {
  from: '"Example" <me@example.com>',
  to: 'user@example.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};
 * @returns {*}
 */
function sendEmail(emailObject) {
  return new Promise(function(resolve, reject) {
    client.sendMail(emailObject, function (err, info) {
      if (err) {
        console.error(err);
        resolve(false);
      }
      else {
        console.log('Message sent: ' + info.response);
        resolve(true);
      }
    });
  });
}

module.exports = sendEmail;