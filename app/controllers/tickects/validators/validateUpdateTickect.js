const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateUpdateTickect = [
  // check('price').isNumeric(),
  // check('amount').isNumeric(),
  check('idOperation')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  // check('idRaffle')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY')
  //   .trim(),
  // check('tickects').optional(),
  check('status').optional(),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]


module.exports = { validateUpdateTickect }
