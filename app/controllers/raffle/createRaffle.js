const Raffle = require('../../models/raffle')
const { createItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { raffleExists, createSlug } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createRaffle = async (req, res) => {
  try {

    // const dataUser = req.user
    const idUser = await isIDGood(req.user._id)
    req = matchedData(req)
    req.slug = createSlug(req.name)
    req.user = idUser;
    
    const doesRaffleExists = await raffleExists(req.slug)
    if (!doesRaffleExists) {
      res.status(201).json(await createItem(req, Raffle))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createRaffle }
