const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')
const { getAfiliates } = require('../controllers/afiliate')
const { validateGetAfiliate } = require('../controllers/afiliate/validator')

/*
 * Afiliate routes
 */


/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetAfiliate, getAfiliates
)




module.exports = router
