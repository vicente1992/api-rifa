const { sendEmail } = require('./sendEmail')
const fs = require('fs')
const path = require('path')
const i18n = require('i18n')

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (user = {}, subject = '', htmlMessage = '') => {
  user = {
    name: user.name,
    email: user.email,
  }
  const data = {
    user,
    subject,
    htmlMessage
  }
  if (process.env.NODE_ENV === 'production') {
    sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${user.email}`)
        : console.log(`Email FAILED to: ${user.email}`)
    )
  } else if (process.env.NODE_ENV === 'development') {
    sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${user.email}`)
        : console.log(`Email FAILED to: ${user.email}`)
    )
  }
}


const parseHtml = (template, user, locale = '') => {
  return new Promise((resolve, reject) => {
    const pathFile = path.join(__dirname, `../../../template/${template}`);
    fs.readFile(`${pathFile}`, 'utf8',
      (err, data) => {
        if (err) {
          reject(err)
          return
        }
        if (user.name) {
          data = data.replace(/NAME_USER/g, user.name);
        }
        if (user.businnes_name) {
          data = data.replace(/BUSINNES_NAME/g, user.businnes_name);
        }
        if (user.data && user.data.amount) {
          data = data.replace(/AMOUNT/g, `${user.data.amount} ${process.env.TYPE_CURRENCY}`);
        }
        if (user.data && user.data.raffleName) {
          data = data.replace(/RAFFLENAME/g, `${user.data.raffleName}`);
        }

        if (user.data && user.data.tickects) {
          i18n.setLocale(locale)
          const message_1 = i18n.__('pay.MESSAGE1')
          const message_2 = i18n.__('pay.MESSAGE2')
          const tickects = user.data.tickects;
          tickects.length > 1 ? data = data.replace(/MESSAGE/g, message_1) :
            data = data.replace(/MESSAGE/g, message_2);
          const content = tickects.reduce(function (a, b) {
            return a + '<tr><td>' + b.value + '</td><td>' + b.price + '</td></tr>';
          }, '');
          data = data.replace(/CONTENT/g, content)
        }
        resolve(data)
      })
  })
}

module.exports = { prepareToSendEmail, parseHtml }
