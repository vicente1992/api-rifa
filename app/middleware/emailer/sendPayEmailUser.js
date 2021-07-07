const i18n = require('i18n')
const { parseHtml, prepareToSendEmail } = require("./prepareToSendEmail")

const sendPayEmailUser = async (locale, user, other = null) => {
  i18n.setLocale(locale)
  const subject = i18n.__('pay.SUBJECT')
  const htmlMessage = await parseHtml('pay_mail_user.html', user, locale)

  prepareToSendEmail(user, subject, htmlMessage)
}


module.exports = {
  sendPayEmailUser
}
