const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TickectSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    idUser: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tickects: {
      type: Array,
      default: []
    },
    idRaffle: {
      type: mongoose.Types.ObjectId,
      ref: 'Raffle',
      required: true,
    },
    status: {
      type: String,
      enum: ['inprogress', 'completed', 'cancel'],
      default: 'inprogress'
    },
    userReferred: {
      type: String
    },

  },
  {
    versionKey: false,
    timestamps: true
  }
)
TickectSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Tickect', TickectSchema)
