
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const {
  validateCreateTickect,
  validateUpdateTickect,
  validateGetTickect }
  = require('../controllers/tickects/validators')
const {
  createTickect,
  getAllTickects,
  getTickect,
  updateTickect,
  getTickectForId
} = require('../controllers/tickects')
/*
 * Get all items route
 */
router.get('/all',
  requireAuth,
  getAllTickects)
/*
 * Get  items route
 */
router.get('/',
  requireAuth,
  getTickect)
/*
 * Get  items route
 */
router.get('/:id',
  requireAuth,
  trimRequest.all,
  validateGetTickect,
  getTickectForId)


/*
 * Post create items route
 */
router.post('/',
  requireAuth,
  trimRequest.all,
  validateCreateTickect,
  createTickect)
/*
 * Post update items route
 */
router.patch('/:id',
  requireAuth,
  trimRequest.all,
  validateUpdateTickect,
  updateTickect)


module.exports = router
