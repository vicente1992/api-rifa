const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItem = (id = '', model = {}, ref = '') => {
  return new Promise((resolve, reject) => {
    model.findById(id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    }).populate(ref).
      exec();
  })
}

module.exports = { getItem }
