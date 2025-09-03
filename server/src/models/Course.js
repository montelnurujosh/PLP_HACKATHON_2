const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('Course', CourseSchema)




