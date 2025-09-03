const mongoose = require('mongoose')

const ProgressSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  percentage: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Progress', ProgressSchema)




