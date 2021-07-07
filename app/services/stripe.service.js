const Payintent = require('../models/payintent')
const stripe = require('../../config/stripe')


exports.createCustomer = async (data) => {
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      source: data.token,
      email: data.email,
    }).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err)
      }
    );
  })

}

exports.createPayTransfer = async (customer, amount,) => {
  amount = (parseFloat(amount)) * 100;
  amount = amount.toString().split('.').join('');

  let mainTransfer = {
    payment_method_types: ['card'],
    amount,
    currency: process.env.TYPE_CURRENCY,
  }

  return new Promise(async (resolve, reject) => {
    stripe.paymentIntents.create(mainTransfer).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err)
      }
    );
  })

}

exports.getDetailCharge = async (id) => {

  return new Promise(async (resolve, reject) => {
    stripe.paymentIntents.retrieve(
      id,
      function (err, response) {
        if (!err) {
          resolve(response);
        } else {
          reject(err)
        }
      }
    )
  })

}