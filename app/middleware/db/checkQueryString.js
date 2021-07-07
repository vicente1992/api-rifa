const { buildErrObject } = require('../../middleware/utils')
const mongoose = require('mongoose')

/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 */
const checkQueryString = (query = {}) => {
  return new Promise((resolve, reject) => {
    try {
      if (
        typeof query.filter !== 'undefined' &&
        typeof query.fields !== 'undefined'
      ) {
        const data = {
          $or: []
        }
        const array = []
        // Takes fields param and builds an array by splitting with ','
        const arrayFields = query.fields.split(',')
        // Adds SQL Like %word% with regex
        arrayFields.map((item) => {
          array.push({
            [item]: {
              $regex: new RegExp(query.filter, 'i')
            }
          })
        })
        // Puts array result in data
        data.$or = array
        resolve(data)
      } else {
        resolve({})
      }
    } catch (err) {
      console.log(err.message)
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}
const getLookListRaffle = (model, query = {}, author = {}) => {
  return model.aggregate([
    {
      $group: {
        _id: '$idUser',
        status: { $first: '$status' },
        amount: { $first: '$amount' },
        idRaffle: { $first: '$idRaffle' },
        idUser: { $first: '$idUser' },
        tickets: { $first: '$tickets' }
      }
    },
    { $sort: { _id: 1, sort: 1 } },
    {
      $match: query
    }
  ])
}
const getLookListTickects = (model, query = {}, author = {}) => {
  return model.aggregate([
    {
      $lookup: {
        from: 'tickets',
        localField: 'tickets',
        foreignField: '_id',
        as: 'tickets_1'
      }
    },
    {
      $group: {
        _id: '$_id',
        status: { $first: '$status' },
        idRaffle: { $first: '$idRaffle' },
        tickects: { $first: '$tickects' }
      }
    },
    { $sort: { _id: 1, sort: 1 } },
    {
      $match: query
    },
    { $match: { 'status': { $ne: 'cancel' } } },
  ])
}
const getLookListAfiliates = (model, query = {}, author = {}) => {
  return model.aggregate([
    {
      $lookup:
      {
        from: 'tickects',
        localField: 'code',
        foreignField: 'userReferred',
        as: 'tickects'
      }
    },
    { $unwind: { path: '$tickects', preserveNullAndEmptyArrays: true } },
    { $match: { 'tickects.status': { $eq: 'completed' } } },
    { $match: { 'tickects.idRaffle': { $eq: mongoose.Types.ObjectId(query.idRaffle) } } },
    // { $match: { "tickects.tickects.0": { $exists: true } } },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        role: { $first: '$role' },
        code: { $first: '$code' },
        tickects: { $push: '$tickects' },
        totalAmount: { $sum: "$tickects.amount" },
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        role: 1,
        code: 1,
        totalAmount: 1,
        price: 1,
        gain: {
          $multiply: ["$totalAmount", 0.2]
        },
        totalReferred: {
          $multiply: ["$totalAmount", 0.2 / 100]
        },
        tickets: {
          $filter: {
            input: "$tickects",
            as: "single_tickect",
            cond: {
              $and: [
                {
                  $eq:
                    ["$$single_tickect.status", 'completed']
                }
              ]
            }
          }
        },
      }
    },
    { $sort: { _id: 1, sort: 1 } },
    { $match: { 'role': { $eq: 'affiliate' } } },
  ])

}

module.exports = { checkQueryString, getLookListRaffle, getLookListTickects, getLookListAfiliates }
