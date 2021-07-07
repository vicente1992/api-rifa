
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')
const {
  createStorage, getStorage,

} = require('../controllers/storage')
const { validateGetStorage } = require('../controllers/storage/validators')


/*
 * Register route
 */
router.post('/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  createStorage
)
/*
 * get route
 */
router.get('/:image', validateGetStorage, getStorage)


module.exports = router
