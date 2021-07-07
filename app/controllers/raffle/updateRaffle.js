const Raffle = require('../../models/raffle')
const { updateItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { raffleExistsExcludingItself, createSlug } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateRaffle = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesCityExists = await raffleExistsExcludingItself(id, req.name)
    req.slug = createSlug(req.name)
    if (!doesCityExists) {
      res.status(200).json(await updateItem(id, Raffle, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateRaffle }
