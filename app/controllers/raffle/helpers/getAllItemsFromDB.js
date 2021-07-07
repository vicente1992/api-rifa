const Raffle = require('../../../models/raffle')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */

/**


.populate('author')
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Raffle.find(
      { deleted: false },
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
    ).populate('user').
      exec();

  })
}

module.exports = { getAllItemsFromDB }
