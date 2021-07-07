const { matchedData } = require('express-validator')

const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const {
  emailExists,
  sendRegistrationEmailMessage
} = require('../../middleware/emailer')
const { randomStr } = require('../../middleware/utils/randomSrt')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
    req.code = randomStr(20);
    const doesEmailExists = await emailExists(req.email)
    if (!doesEmailExists) {
      const item = await registerUser(req)
      const userInfo = await setUserInfo(item)
      const response = await returnRegisterToken(item, userInfo)
      sendRegistrationEmailMessage(locale, item)
      res.status(201).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
