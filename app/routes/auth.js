const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  register,
  verify,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  login,
  roleAuthorization,
  OAuthSocial,
  cbSocial

} = require('../controllers/auth')

const {
  validateRegister,
  validateVerify,
  validateForgotPassword,
  validateResetPassword,
  validateLogin,
  validateOAuthSocial,
  validateSocial
} = require('../controllers/auth/validators')

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post('/register', trimRequest.all, validateRegister, register)

/*
 * Verify route
 */
router.post('/verify', trimRequest.all, validateVerify, verify)

/*
 * Forgot password route
 */
router.post('/forgot', trimRequest.all, validateForgotPassword, forgotPassword)

/*
 * Reset password route
 */
router.post('/reset', trimRequest.all, validateResetPassword, resetPassword)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  roleAuthorization(['user', 'admin', 'affiliate']),
  trimRequest.all,
  getRefreshToken
)

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)


/*
 * OAUTH
 */
router.get('/oauth-social', trimRequest.all, validateOAuthSocial, OAuthSocial)


/*
 * PreSocial
 */
router.get('/pre-social', trimRequest.all, validateSocial, cbSocial)
module.exports = router
