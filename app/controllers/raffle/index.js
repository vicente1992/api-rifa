
const { createRaffle } = require('./createRaffle')
const { deleteRaffle } = require('./deleteRaffle')
const { getAllRaffle } = require('./getAllRaffle')
const { getRaffle, getRaffleSlug } = require('./getRaffle')
const { updateRaffle } = require('./updateRaffle')
module.exports = {
  createRaffle,
  getAllRaffle,
  getRaffle,
  updateRaffle,
  getRaffleSlug,
  deleteRaffle
}
