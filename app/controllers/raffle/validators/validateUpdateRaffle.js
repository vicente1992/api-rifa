const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateUpdateRaffle = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('price').isNumeric(),
  check('amountNumber').isNumeric(),
  check('slug').optional(),
  check('avatar').optional(),
  check('tickects').optional(),
  check('description').optional(),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  //
  (req, res, next) => {
    validateResult(req, res, next)
  }
]


module.exports = { validateUpdateRaffle }
