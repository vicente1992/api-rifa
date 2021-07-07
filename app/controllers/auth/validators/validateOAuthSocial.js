const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates OAuthSocial request
 */
const validateOAuthSocial = [
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

module.exports = { validateOAuthSocial }
