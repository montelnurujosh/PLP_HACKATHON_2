const mongoose = require('mongoose')

const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('Discussion', DiscussionSchema)




