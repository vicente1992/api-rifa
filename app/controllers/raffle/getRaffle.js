const { matchedData } = require('express-validator')
const Raffle = require('../../models/raffle')
const Tickect = require('../../models/tickect')
const { getItem, getItemsAggreate, getLookListTickects } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { getRaffleSlugFromDB } = require('./helpers')
const { getAvailableTickects } = require('../tickects/helpers/getAvailableTickects')
const { sendPayEmailUser } = require('../../middleware/emailer/prepareToSendEmail')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRaffle = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Raffle, 'user'))
  } catch (error) {
    handleError(res, error)
  }
}
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRaffleSlug = async (req, res) => {
  try {
    
    req = matchedData(req)
  

    const data = await getRaffleSlugFromDB(req.slug);
    let query = {
      idRaffle: data._id,
    }
    const tickectsUnAvailable = await getLookListTickects(Tickect, query)
    const tickectsAvailable = getAvailableTickects(data.tickects, tickectsUnAvailable)
    data.tickects = tickectsAvailable;
    

    res.status(200).json(data)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getRaffle, getRaffleSlug }
