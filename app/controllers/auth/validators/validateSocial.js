const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates validateSocial request
 */
const validateSocial = [
  check('code')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('provider')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }

]

module.exports = { validateSocial }
