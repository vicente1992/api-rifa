const Ticket = require('../../../models/tickect')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = (query = {}) => {
  return new Promise((resolve, reject) => {
    Ticket.find(
      query,
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        }
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

module.exports = { getAllItemsFromDB }
