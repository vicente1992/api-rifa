const { validateForgotPassword } = require('./validateForgotPassword')
const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateResetPassword } = require('./validateResetPassword')
const { validateVerify } = require('./validateVerify')
const { validateOAuthSocial } = require('./validateOAuthSocial')
const { validateSocial } = require('./validateSocial')
const { validateLeads } = require('../../leads/validators/validateLeads')


module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerify,
  validateOAuthSocial,
  validateSocial,
  validateLeads

}
