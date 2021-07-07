const { emailExists } = require('./emailExists')
const { emailExistsExcludingMyself } = require('./emailExistsExcludingMyself')
const { prepareToSendEmail } = require('./prepareToSendEmail')
const { sendEmail } = require('./sendEmail')
const { sendPayEmailUser } = require('./sendPayEmailUser')
const {
  sendRegistrationEmailMessage
} = require('./sendRegistrationEmailMessage')
const {
  sendResetPasswordEmailMessage
} = require('./sendResetPasswordEmailMessage')

module.exports = {
  emailExists,
  emailExistsExcludingMyself,
  prepareToSendEmail,
  sendEmail,
  sendRegistrationEmailMessage,
  sendResetPasswordEmailMessage,
  sendPayEmailUser
}
