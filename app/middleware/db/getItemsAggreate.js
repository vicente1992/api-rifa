const { itemNotFound } = require("../utils")

/**
   *
   * @param {*} req
   * @param {*} model
   */
const getItemsAggreate = (query, model, handle = true) => {
  return new Promise((resolve, reject) => {
    model.aggregate(query, (err, items) => {
      console.log(items)
      if (handle) {
        itemNotFound(err, items, reject, 'NOT_FOUND')
      }
      resolve(items)
    })
  })
}

module.exports = {
  getItemsAggreate
}
