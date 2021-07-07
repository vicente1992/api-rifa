const { createTickect } = require('./createTickect')
const { getAllTickects } = require('./getAllTickects')
const { getTickect } = require('./getTickect')
const { getTickectForId } = require('./getTickectForId')
const { updateTickect } = require('./updateTickect')
module.exports = {
  createTickect,
  getAllTickects,
  getTickect,
  updateTickect,
  getTickectForId
}
