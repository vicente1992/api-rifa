const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PayIntent = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    extra: {
      type: Object
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
PayIntent.plugin(mongoosePaginate)
module.exports = mongoose.model('PayIntent', PayIntent)
