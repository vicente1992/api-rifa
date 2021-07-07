const model = require('../../models/leads')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')



const createLead = async (req, res) => {
  try {
    req = matchedData(req)
    res.status(201).json(await createItem(req, model))
  } catch (error) {
    handleError(res, error)
  }
};
module.exports = { createLead }
