const Tickect = require('../../models/tickect')
const { createItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const { matchedData } = require('express-validator')



/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createTickect = async (req, res) => {
  try {

    const idUser = await isIDGood(req.user._id)
    req = matchedData(req)
    req.idUser = idUser;
    res.status(201).json(await createItem(req, Tickect))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createTickect }
