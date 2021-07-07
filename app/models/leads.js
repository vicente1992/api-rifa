const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const LeadsSchema = new mongoose.Schema(
  {
    provider: {
      type: {
        authToken: String,
        idToken: String,
        provider: String,
        email: String,
        id: String
      }
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
LeadsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Leads', LeadsSchema)
