const Raffle = require('../../models/raffle')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { deleteItem, getItem } = require('../../middleware/db')
const { delefile } = require('../storage/helpers/deleteStorage')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteRaffle = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const itemRaffle = await getItem(id, Raffle)
    await delefile(itemRaffle.avatar)
    return res.status(200).json(await deleteItem(id, Raffle))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteRaffle }
