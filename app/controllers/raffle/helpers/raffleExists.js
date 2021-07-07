const Raffle = require('../../../models/raffle')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const raffleExists = (slug = '') => {
  return new Promise((resolve, reject) => {
    Raffle.findOne(
      {
        slug
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'RAFFLE_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { raffleExists }
