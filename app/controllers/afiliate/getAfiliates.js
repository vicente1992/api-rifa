const { matchedData } = require('express-validator')
const User = require('../../models/user')
const Tickect = require('../../models/tickect')
const { getLookListAfiliates } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')


/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAfiliates = async (req, res) => {
  try {

    req = matchedData(req)
    let query = {
      idRaffle: req.id,
    }
    const afiliates = await getLookListAfiliates(User, query)

    return res.status(200).json(afiliates)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAfiliates }
