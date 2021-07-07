const { itemNotFound } = require("../utils")

/**
   *
   * @param {*} req
   * @param {*} model
   */
const getItemAggreate = (query, model, handle = true) => {
  return new Promise((resolve, reject) => {
    model.aggregate(query, (err, item) => {
      const data = item.find(() => true)
      if (handle) {
        itemNotFound(err, data, reject, 'NOT_FOUND')
      }
      resolve(data)
    })
  })
}

module.exports = {
  getItemAggreate
}
