const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')
const { createPayIntent } = require('../controllers/payintent')
const { validateCreatePayintent } = require('../controllers/payintent/validator')


/*
 * Register route
 */

router.post('/',
  requireAuth,
  roleAuthorization(['user', 'admin', 'affiliate']),
  trimRequest.all,
  validateCreatePayintent,
  createPayIntent
)


module.exports = router
