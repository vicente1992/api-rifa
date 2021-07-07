const { itemNotFound } = require('../../../middleware/utils');
const Raffle = require('../../../models/raffle')


/**
 * Gets item from database by id
 * @param {string} slug - item id
 */
const getRaffleSlugFromDB = (slug = '') => {
  return new Promise((resolve, reject) => {
    Raffle.findOne({ slug }, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    }).populate('user').
      exec();
  })
}


module.exports = { getRaffleSlugFromDB }
