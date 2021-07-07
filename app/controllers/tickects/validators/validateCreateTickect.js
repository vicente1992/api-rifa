const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateTickect = [
  // check('price').isNumeric(),
  check('amount').isNumeric(),
  check('idRaffle')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('tickects').optional(),
  check('userReferred').optional(),
  // check('idTicket')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY')
  //   .trim(),
  // check('confirmed').isBoolean().optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]


module.exports = { validateCreateTickect }
