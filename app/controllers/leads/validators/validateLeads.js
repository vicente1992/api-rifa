const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates validateLeads request
 */
const validateLeads = [
  check('provider')
    .exists(),
  (req, res, next) => {
    validateResult(req, res, next)
  }

]

module.exports = { validateLeads }
