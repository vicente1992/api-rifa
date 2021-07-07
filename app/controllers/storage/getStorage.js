const { matchedData } = require('express-validator')
const fs = require('fs')
const path = require('path')
const { handleError } = require('../../middleware/utils')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getStorage = async (req, res) => {
  try {
    req = matchedData(req)
    const pathImg = path.join(__dirname, `../../../public/storage/${req.image}`);
    if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
    }
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = {
  getStorage
}
