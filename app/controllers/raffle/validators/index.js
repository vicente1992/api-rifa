
const { validateCreateRaffle } = require('./validateCreateRaffle')
const { validateDeleteRaffle } = require('./validateDeleteRaffle')
const { validateGetRaffle,
  validateGetRaffleSlug } = require('./validateGetRaffle')
const { validateUpdateRaffle } = require('./validateUpdateRaffle')

module.exports = {
  validateCreateRaffle,
  validateGetRaffle,
  validateGetRaffleSlug,
  validateUpdateRaffle,
  validateDeleteRaffle
}
