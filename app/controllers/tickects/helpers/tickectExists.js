const Tickect = require('../../../models/tickect')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const tickectExists = (idTicket = '') => {
  return new Promise((resolve, reject) => {
    Tickect.findOne(
      {
        idTicket
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'TICKECT_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { tickectExists }
