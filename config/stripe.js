const config = {
  pk: process.env.STRIPE_PK,
  sk: process.env.STRIPE_SK,
  id: process.env.STRIPE_ID
}

const stripe = require('stripe')(config.sk);

module.exports = stripe;