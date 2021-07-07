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
  validateCreateRaffle,
  validateGetRaffle,
  validateUpdateRaffle,
  validateGetRaffleSlug,
  validateDeleteRaffle
}
  = require('../controllers/raffle/validators')
const {
  createRaffle,
  getAllRaffle,
  getRaffle,
  updateRaffle,
  getRaffleSlug,
  deleteRaffle
} = require('../controllers/raffle')


/*
 * Get all items route
 */
router.get('/all', getAllRaffle)
/*
 * Register route
 */

router.post('/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateCreateRaffle,
  createRaffle
)

/*
* Get item route
*/
router.get(
  '/:id',
  requireAuth,
  trimRequest.all,
  validateGetRaffle,
  getRaffle
)
/*
* Get item route
*/
router.get('/slug/:slug',
  trimRequest.all,
  validateGetRaffleSlug,
  getRaffleSlug
)
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateRaffle,
  updateRaffle
)


/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteRaffle,
  deleteRaffle
)
module.exports = router
