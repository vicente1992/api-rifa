const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const RaffleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    amountNumber: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    avatar: {
      type: String,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tickects: {
      type: Array,
      default: []
    },
    deleted: {
      type: Boolean,
      enum: [true, false],
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
RaffleSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Raffle', RaffleSchema)
