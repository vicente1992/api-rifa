const model = require('../../models/leads')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

const findLead = (provider) => {
  return new Promise((resolve, reject) => {

    model.findOneAndUpdate(
      { "provider.id": provider.id },
      {
        $set: {
          provider: {
            authToken: provider.authToken,
            provider: provider.provider,
            email: provider.email,
            id: provider.id,
            refreshToken: provider.refreshToken
          }
        }
      },
      { //options
        upsert: true
      }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }
    )
  })
}
module.exports = { findLead }
