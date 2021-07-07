const { matchedData } = require("express-validator");
const { handleError } = require("../../middleware/utils/utils")
const stripeService = require('../../services/stripe.service')
const mongoose = require('mongoose');


const parsePay = (obj, to, from) => {
  const amount = parseFloat(obj.amount) / 100;
  const data = {
    status: (obj.status === 'succeeded') ? 'success' : 'hold',
    idOperation: obj.id,
    amount,
    feedMediatory: 0,
    currency: process.env.TYPE_CURRENCY,
    idUser: mongoose.Types.ObjectId(from),
    to: mongoose.Types.ObjectId(to),
    customData: obj,
    description: obj.description,
    feed: parseFloat(amount) * parseFloat(process.env.FEED),
  }
  return data;
}
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createPayIntent = async (req, res) => {
  try {
    const user = req.user;
    req = matchedData(req)
    stripeService.createCustomer({
      token: req.token,
      email: user.email
    }).then(async (customer) => {
      const payResponse = await stripeService.createPayTransfer(customer.id, req.amount)
      const payOrder = parsePay({
        ...payResponse, ...{
          description: req.description
        }
      }, req.to, user.id)
      res.status(201).json(payOrder)

    }).catch(async (err) => {
      handleError(res, { code: err.statusCode, message: err.code })
    });
  } catch (error) {
    handleError(res, error)
  }
}


module.exports = {
  createPayIntent
}