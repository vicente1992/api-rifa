const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')


/**
 * Validates create new item request
 */
const validateCreatePayintent = [
  check('amount')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty(),
  check('description').optional(),
  check('token')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty(),
  check('to')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty(),
  check('extra'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  validateCreatePayintent
}