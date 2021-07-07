const Tickect = require('../../models/tickect')
const Raffle = require('../../models/raffle')
const { updateItem, getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const stripeService = require('../../services/stripe.service')
const { sendPayEmailUser } = require('../../middleware/emailer')


/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTickect = async (req, res) => {
  try {
    const locale = req.getLocale()
    const user = req.user
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const selfItem = await getItem(id, Tickect)
    const raffle = await getItem(selfItem.idRaffle, Raffle)
    let emailBody = {
      name: user.name,
      email: user.email,
      data: {
        amount: selfItem.amount,
        tickects: selfItem.tickects,
        raffleName: raffle.name
      }
    }
    req.status = 'completed';
    const detailPay = await stripeService.getDetailCharge(req.idOperation)
    if (detailPay.status.includes('succeeded')) {
      await sendPayEmailUser(locale, emailBody)
      res.status(200).json(await updateItem(id, Tickect, req))
    } else {
      handleError(res, { code: 422, message: 'Error with status' })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateTickect }
