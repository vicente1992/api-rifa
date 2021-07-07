const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
// const sendEmail = async (data = {}, callback) => {
//   const auth = {
//     auth: {
//       // eslint-disable-next-line camelcase
//       api_key: process.env.EMAIL_SMTP_API_MAILGUN,
//       domain: process.env.EMAIL_SMTP_DOMAIN_MAILGUN
//     }
//     // host: 'api.eu.mailgun.net' // THIS IS NEEDED WHEN USING EUROPEAN SERVERS
//   }
//   const transporter = nodemailer.createTransport(mg(auth))
//   const mailOptions = {
//     from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
//     to: `${data.user.name} <${data.user.email}>`,
//     subject: data.subject,
//     html: data.htmlMessage
//   }
//   transporter.sendMail(mailOptions, (err) => {
//     if (err) {
//       return callback(false)
//     }
//     return callback(true)
//   })
// }
/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */

const sendEmail = async (data, callback) => {
  let auth = {}
  if (process.env.NODE_ENV === 'development') {
    auth = {
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_SMTP_PORT,
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS

      }
    };

  } else {
    const options = {
      auth: {
        api_user: process.env.SENDGRID_USER,
        api_key: process.env.SENDGRID_PASSWORD
      }
    }
    auth = sgTransport(options);
  }

  const transporter = nodemailer.createTransport(auth)
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: `${data.user.name} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage,
    bcc: process.env.EMAIL_BBC
  }
  transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log('Error', err)
      return callback(false)
    }
    return callback(true)
  })
}
module.exports = { sendEmail }
