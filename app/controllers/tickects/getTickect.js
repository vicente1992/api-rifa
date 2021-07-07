const Tickect = require('../../models/tickect')
const {
  checkQueryString,
  getItemAggreate
} = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTickect = async (req, res) => {
  try {

    const query = await checkQueryString(req.query)
    const aggregate = [{
      $match: query
    },
    { $limit: 1 }
    ]
    console.log(aggregate)

    const data = await getItemAggreate(aggregate, Tickect)
    res.status(200).json(data)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getTickect }
