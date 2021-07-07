const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login, OAuthSocial, cbSocial } = require('./login')
const { register } = require('./register')
const { resetPassword } = require('./resetPassword')
const { roleAuthorization } = require('./roleAuthorization')
const { verify } = require('./verify')

module.exports = {
  forgotPassword,
  getRefreshToken,
  login,
  register,
  resetPassword,
  roleAuthorization,
  verify,
  OAuthSocial,
  cbSocial

}
